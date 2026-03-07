import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const articleId = searchParams.get("articleId");

        if (!articleId) {
            return NextResponse.json({ message: "article ID is required" }, { status: 400 });
        }

        const article = await db.article.findUnique({
            where: {
                id: articleId,
            },
            include: {
                user: true,
                articleTags: {
                    include: {
                        tag: true,
                    },
                },
                articleLikes: true,
                bookmark: {
                    where: {
                        userId: session.user.id,
                    },
                },
            },
        });

        if (!article) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        const transformedArticle = {
            ...article,
            tags: article.articleTags.map(pt => pt.tag),
            likeCount: article.articleLikes.length,
            isLiked: article.articleLikes.some(like => like.userId === session.user.id),
            bookmarked: article.bookmark.length > 0,
        };

        return NextResponse.json(transformedArticle);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}