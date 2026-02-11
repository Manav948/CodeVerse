import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { updateQuestionSchema } from "@/schema/updateQuestionSchema"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })
        }
        const body = await request.json()
        const result = updateQuestionSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
        }
        const questionId = typeof body?.questionId === "string" ? body.questionId : null
        if (!questionId) {
            return NextResponse.json(
                { message: "Missing required field: questionId" },
                { status: 400 }
            )
        }
        const { title, description } = result.data

        const existing = await db.question.findFirst({
            where: { id: questionId, userId: session.user.id },
            select: { id: true },
        })

        if (!existing) {
            return NextResponse.json({ message: "Question not found" }, { status: 404 })
        }

        const updatedQuestion = await db.question.update({
            where: { id: questionId },
            data: {
                title,
                description,
            },
        })

        return NextResponse.json(updatedQuestion, { status: 200 })
    } catch (error) {
        console.error("Error updating question:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
