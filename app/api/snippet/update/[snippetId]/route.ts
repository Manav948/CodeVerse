import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { updateSnippetSchema } from "@/schema/updateSnippetSchema"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

interface Props {
    params: Promise<{ snippetId: string }>
}
export async function POST(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return new Response("Unauthorized User", { status: 401 })
        }
        const body = await request.json()
        const result = updateSnippetSchema.safeParse(body)
        if (!result.success) {
            return new Response("Invalid request body", { status: 400 })
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
            return NextResponse.json("Snippet not found", { status: 404 })
        }
        return NextResponse.json(JSON.stringify(updateSnippet), { status: 200 })
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 })
    }
}
