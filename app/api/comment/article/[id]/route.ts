import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json("User Not Authenticated", { status: 401 });
    }

    const { id: articleId } = await params;

    const comments = await db.comment.findMany({
      where: { articleId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching article comments:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json("User Not Authenticated", { status: 401 });
    }

    const { id: articleId } = await params;
    const body = await req.json();
    const { commentText } = body;

    if (!commentText || commentText.trim().length === 0) {
      return NextResponse.json("Comment text is required", { status: 400 });
    }

    if (commentText.trim().length > 500) {
      return NextResponse.json("Comment too long (max 500 chars)", {
        status: 400,
      });
    }

    
    const article = await db.article.findUnique({ where: { id: articleId } });
    if (!article) {
      return NextResponse.json("Article not found", { status: 404 });
    }

    const comment = await db.comment.create({
      data: {
        commentText: commentText.trim(),
        commentableId: articleId,
        commentableType: "ARTICLE",
        userId: session.user.id,
        articleId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating article comment:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
