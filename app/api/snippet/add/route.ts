import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addSnippetSchema } from "@/schema/addSnippetSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json("User Not Authenticated", { status: 401 })
        }

        const userId = session.user.id
        const body = await request.json()
        const result = addSnippetSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json("Invalid request body - failed to parse JSON", { status: 400 })
        }
        const { title, code, description, visibility, tags, language } = result.data

        const tagObject = tags ? await Promise.all(tags.map(async (tag) => {
            return await db.tag.upsert({
                where: { id: tag },
                update: {},
                create: { name: tag }
            })
        })
        ) : []
        const snippet = await db.snippet.create({
            data: {
                title,
                code,
                description,
                language,
                visibility: (visibility as any) || "PUBLIC",
                userId: userId,
                tags: {
                    create: tagObject.map((tagPromise) => ({
                        tagId: tagPromise.id
                    }))
                }
            },
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true
                    }
                }
            }
        })
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                totalSnippets: {
                    increment: 1
                },
                lastActiveAt: new Date()
            }
        })
        return NextResponse.json(snippet, { status: 201 })
    } catch (error) {
        console.error("Error adding snippet:", error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}