import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        const userId = await session?.user.id
        if (!session?.user) {
            return NextResponse.json("User Not Authenticated", { status: 401 })
        }

        const snippets = await db.snippet.findMany({
            where: {
                visibility: "PUBLIC"

            },
            orderBy: {
                created_at: "desc"
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
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
                                email: true
                            }
                        }
                    }
                },
                snippetLikes: {
                    select: {
                        userId: true
                    }
                },
                bookmark :{
                    select :{
                        userId : true
                    }
                }
            }
        })
        if (snippets.length === 0) {
            return NextResponse.json("No Snippets Found For The User", { status: 404 })
        }
        const transformedSnippets = snippets.map((snippet) => ({
            ...snippet,
            tags: snippet.tags.map((snippetTag) => snippetTag.tag),
            likeCount: snippet.snippetLikes.length,
            isLiked: snippet.snippetLikes.some((like) => like.userId === userId),
            bookmarked : snippet.bookmark.some((bookmark) => bookmark.userId === userId)
        }))
        return NextResponse.json(transformedSnippets, { status: 200 })
    }
    catch (error) {
        console.log("Error While fetching Snippet", error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}