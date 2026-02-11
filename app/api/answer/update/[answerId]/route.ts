import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateAnswerSchema } from "@/schema/updateAnswerSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: Promise<{ answerId: string }>;
}

export async function POST(request: NextRequest, { params }: Props) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const parsed = updateAnswerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(parsed.error.format(), { status: 400 });
        }

        const { description } = parsed.data;
        const { answerId } = await params;

        const existingAnswer = await db.answer.findFirst({
            where: {
                id: answerId,
                userId: session.user.id,
            },
        });

        if (!existingAnswer) {
            return NextResponse.json("Answer not found or access denied", {
                status: 404,
            });
        }

        const updatedAnswer = await db.answer.update({
            where: { id: answerId },
            data: {
                description,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true
                    }
                }
            },
        });

        return NextResponse.json(updatedAnswer, { status: 200 });
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}
