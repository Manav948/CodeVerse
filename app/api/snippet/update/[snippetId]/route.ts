import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { updateSnippetSchema } from "@/schema/updateSnippetSchema"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

interface Props {
    params: Promise<{ snippetId: string }>
}
export async function POST(request: NextRequest, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })
        }
        const body = await request.json()
        const result = updateSnippetSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
        }
        const { title, code, description, tags, visibility } = result.data
        const { snippetId } = await params

        const updateSnippet = await db.snippet.update({
            where: {
                id: snippetId
            },
            data: {
                title: title,
                code: code,
                description: description,
                visibility: visibility as "PUBLIC" | "PRIVATE" | "SHARED" as any,
            }
        })
        if (!updateSnippet) {
            return NextResponse.json({ message: "Snippet not found" }, { status: 404 })
        }
        return NextResponse.json(updateSnippet, { status: 200 })
    } catch (error) {
        console.error("Error updating snippet:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
