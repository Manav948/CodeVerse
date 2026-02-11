import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addArticleSchema } from "@/schema/addArticleSchema";
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
        const result = addArticleSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json("Invalid request body - failed to parse JSON", { status: 400 })
        }
        const { title, description, tags, links, image } = result.data

        const tagObject = tags ? await Promise.all(tags.map(async (tag) => {
            return await db.tag.upsert({
                where: { id: tag },
                update: {},
                create: { name: tag }
            })
        })
        ) : []
        const article = await db.article.create({
            data: {
                title,
                description,
                image,
                links,
                userId: userId,
                articleTags: {
                    create: tagObject.map((tagPromise) => ({
                        tagId: tagPromise.id
                    }))
                }
            },
            include: {
                articleTags: {
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
                lastActiveAt: new Date()
            }
        })
        return NextResponse.json(article, { status: 201 })
    } catch (error) {
        console.error("Error adding article :", error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}