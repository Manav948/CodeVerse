import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json("User Not Authenticated", { status: 401 })
        }
        const userId = await session.user.id
        const post = await db.post.findMany({
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
                postLikes: {
                    select: {
                        userId: true
                    }
                },
                bookmark: {
                    select: {
                        userId: true
                    }
                }
            }
        })
        if (post.length === 0) {
            return NextResponse.json("No Post Found For The User", { status: 404 })
        }
        const transformedSnippets = post.map((post) => ({
            ...post,
            tags: post.tags.map((postTag) => postTag.tag),
            likeCount: post.postLikes.length,
            isLiked: post.postLikes.some((like) => like.userId === userId),
            bookmarked: post.bookmark.some((bookmark) => bookmark.userId === userId)
        }))
        return NextResponse.json(transformedSnippets, { status: 200 })
    }
    catch (error) {
        console.log("Error While fetching Snippet", error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}