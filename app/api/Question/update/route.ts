import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { updateQuestionSchema } from "@/schema/updateQuestionSchema"
import { updateSnippetSchema } from "@/schema/updateSnippetSchema"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

interface Props {
    params: Promise<{ questionId: string }>
}
export async function POST(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return new Response("Unauthorized User", { status: 401 })
        }
        const body = await request.json()
        const result = updateQuestionSchema.safeParse(body)
        if (!result.success) {
            return new Response("Invalid request body", { status: 400 })
        }
        const { title, description } = result.data
        const { questionId } = await params

        const updateQuestion = await db.question.update({
            where: {
                id: questionId
            },
            data: {
                title: title,
                description: description,
            }
        })
        if (!updateQuestion) {
            return NextResponse.json("Question not found", { status: 404 })
        }
        return NextResponse.json(JSON.stringify(updateQuestion), { status: 200 })
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 })
    }
}
