import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        "User Not Authenticated",
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const articles = await db.article.findMany({
      where: { userId },
      include: {
        articleTags: {
          include: { tag: true },
        },
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        articleLikes: {
          select: { userId: true },
        },
        bookmark: {
          select: { userId: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    const transformed = articles.map((article) => ({
      ...article,
      tags: article.articleTags.map(
        (t) => t.tag
      ),
      likeCount: article.articleLikes.length,
      isLiked: article.articleLikes.some(
        (like) => like.userId === userId
      ),
      bookmarked: article.bookmark.some(
        (b) => b.userId === userId
      ),
    }));

    return NextResponse.json(transformed, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      "Internal Server Error",
      { status: 500 }
    );
  }
}