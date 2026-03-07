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
        const questionId = searchParams.get("questionId");

        if (!questionId) {
            return NextResponse.json({ message: "question ID is required" }, { status: 400 });
        }

        const question = await db.question.findUnique({
            where: {
                id: questionId,
            },
            include: {
                user: true,
                questionLikes: true,
                bookmark: {
                    where: {
                        userId: session.user.id,
                    },
                },
            },
        });

        if (!question) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        const transformedQuestion = {
            ...question,
            likeCount: question.questionLikes.length,
            isLiked: question.questionLikes.some(like => like.userId === session.user.id),
            bookmarked: question.bookmark.length > 0,
        };

        return NextResponse.json(transformedQuestion);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}