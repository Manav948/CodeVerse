import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{
    questionId: string;
  }>;
}

export async function GET(request: Request, { params }: Props) {
  try {
    const { questionId } = await params;

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const question = await db.question.findUnique({
      where: { id: questionId },
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
          select: { userId: true },
        },
      },
    });

    if (!question) {
      return NextResponse.json("Question not found", { status: 404 });
    }

    const transformed = {
      ...question,
      likeCount: question.questionLikes.length,
      isLiked: question.questionLikes.some(
        (like) => like.userId === userId
      ),
    };

    return NextResponse.json(transformed, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Error", { status: 500 });
  }
}
