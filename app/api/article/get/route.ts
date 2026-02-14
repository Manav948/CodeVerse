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
        const userId = session.user.id;
        const article = await db.article.findMany({
            where: {
                userId: userId
            },
            include: {
                articleTags: {
                    include: {
                        tag: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        username: true,
                        image: true
                    }
                },
                articleLikes: {
                    select: {
                        userId: true
                    }
                },
                bookmark: {
                    select: {
                        userId: true
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        })
        if (article.length === 0) {
            return NextResponse.json("No post Found For The User", { status: 404 })
        }
        const transformedSnippets = article.map((article) => ({
            ...article,
            tags: article.articleTags.map((articleTag) => articleTag.tag),
            likeCount: article.articleLikes.length,
            isLiked: article.articleLikes.map((articleLike) => articleLike.userId === userId),
            bookmarked : article.bookmark.some((bookmark) => bookmark.userId === userId)
        }))
        return NextResponse.json(transformedSnippets, { status: 200 })
    }
    catch (error) {
        console.log("Error While fetching Snippet", error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}