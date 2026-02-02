import { authOptions, } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

interface Props {
    params: Promise<{ snippetId: string }>
}

export async function GET(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return new Response("Unauthorized User", { status: 401 })
        }
        const { snippetId } = await params
        if (!snippetId) {
            return new Response("Snippet ID is required", { status: 400 })
        }
        const snippet = await db.snippet.findUnique({
            where: {
                id: snippetId,
                visibility: "PUBLIC"
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        image: true
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                },
                comments: {
                    select: {
                        id: true,
                        commentText: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })
        if (!snippet) {
            return new Response("Snippet not found", { status: 404 })
        }
        return new Response(JSON.stringify(snippet), { status: 200 })
    } catch (error) {
        console.log("[SNIPPET_GET_SPECIFIC_ERROR]", error)
        return new Response("Internal Server Error", { status: 500 })
    }
} 