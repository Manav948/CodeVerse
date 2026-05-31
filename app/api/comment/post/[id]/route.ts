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

    const { id: postId } = await params;

    const comments = await db.comment.findMany({
      where: { postId },
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
    console.error("Error fetching post comments:", error);
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

    const { id: postId } = await params;
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

    const post = await db.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json("Post not found", { status: 404 });
    }

    const comment = await db.comment.create({
      data: {
        commentText: commentText.trim(),
        commentableId: postId,
        commentableType: "POST",
        userId: session.user.id,
        postId,
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
    console.error("Error creating post comment:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
