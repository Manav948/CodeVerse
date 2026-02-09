import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteQuestionSchema } from "@/schema/deleteQuestion";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401, statusText: "Unauthorized User" })
    }
    const userId = session.user.id
    const body = await request.json()
    const result = deleteQuestionSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json("Invalid request body - failed to parse JSON", { status: 400 })
    }
    const { questionId} = result.data
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
        })
        if (!user) {
            return NextResponse.json("User not Found", { status: 404 })
        }
        const question = await db.question.findUnique({
            where: {
                id: questionId
            }
        })
        if (!question) {
            return NextResponse.json("No Question Found", { status: 404 })
        }
        await db.question.delete({
            where: {
                id: question.id,
                userId
            }
        })
        return NextResponse.json("OK", { status: 200 })
    } catch (error) {
        console.log("Error in delete Question : ", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}