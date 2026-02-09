import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addQuestion } from "@/schema/addQuestion";
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
        const result = addQuestion.safeParse(body)

        if (!result.success) {
            return NextResponse.json("Invalid request body - failed to parse JSON", { status: 400 })
        }
        const { title,description } = result.data

        const question= await db.question.create({
            data: {
                title,
                description,
                userId
            },
            include: {
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
        return NextResponse.json(question, { status: 201 })
    } catch (error) {
        console.error("Error adding question:", error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}