import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteSnippetSchema } from "@/schema/deleteSnippetSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401, statusText: "Unauthorized User" })
    }
    const userId = session.user.id
    const body = await request.json()
    const result = deleteSnippetSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json("Invalid request body - failed to parse JSON", { status: 400 })
    }
    const { snippetId } = result.data
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
        })
        if (!user) {
            return NextResponse.json("User not Found", { status: 404 })
        }
        const snippet = await db.snippet.findUnique({
            where: {
                id: snippetId
            }
        })
        if (!snippet) {
            return NextResponse.json("No Snippet Found", { status: 404 })
        }
        await db.snippet.delete({
            where: {
                id: snippet.id,
                userId
            }
        })
        return NextResponse.json("OK", { status: 200 })
    } catch (error) {
        console.log("Error in delete Snippet : ", error)
        return new NextResponse("internal server error", { status: 500 })
    }
}