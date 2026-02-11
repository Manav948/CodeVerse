import { authOptions, } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: Promise<{ snippetId: string }>
}

export async function GET(_request: NextRequest, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })
        }
        const { snippetId } = await params
        if (!snippetId) {
            return NextResponse.json({ message: "Snippet ID is required" }, { status: 400 })
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
            return NextResponse.json({ message: "Snippet not found" }, { status: 404 })
        }
        return NextResponse.json(snippet, { status: 200 })
    } catch (error) {
        console.log("[SNIPPET_GET_SPECIFIC_ERROR]", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
} 