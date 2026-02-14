import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "User Not Authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const questions = await db.question.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        answer: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                image: true,
              },
            },
          },
          orderBy: {
            created_at: "asc",
          },
        },
        questionLikes: {
          select: {
            userId: true,
          },
        },
        bookmark :{
          select :{
            userId : true
          }
        }
      },
    });

    const transformed = questions.map((q) => ({
      ...q,
      likeCount: q.questionLikes.length,
      isLiked: q.questionLikes.some(
        (like) => like.userId === userId
      ),
      bookmarked : q.bookmark.some((bookmark) => bookmark.userId === userId)
    }));

    return NextResponse.json(transformed, { status: 200 });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
