import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addAnswerSchema } from "@/schema/addAnswerSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = addAnswerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid request body", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { questionId, description } = parsed.data;
    const userId = session.user.id;

    const answer = await db.$transaction(async (tx) => {
      const question = await tx.question.findUnique({
        where: { id: questionId },
      });

      if (!question) {
        throw new Error("Question not found");
      }

      const createdAnswer = await tx.answer.create({
        data: {
          description,
          questionId,
          userId,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              image: true,
            },
          },
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          lastActiveAt: new Date(),
        },
      });

      return createdAnswer;
    });

    return NextResponse.json(answer, { status: 201 });

  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
