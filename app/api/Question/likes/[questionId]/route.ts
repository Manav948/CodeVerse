import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

interface Props {
    params: Promise<{ questionId: string }>
}
export async function POST(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }
        const userId = session.user.id
        const { questionId } = await params

        const existingLikes = await db.questionLike.findUnique({
            where: {
                questionId_userId: {
                    userId,
                    questionId

                }
            }
        })
        if (existingLikes) {
            await db.questionLike.delete({
                where: {
                    questionId_userId: {
                        userId,
                        questionId
                    }
                }
            })
            return NextResponse.json({ liked: false })
        }
        await db.questionLike.create({
            data: {
                userId,
                questionId

            }
        })
        return NextResponse.json({ liked: true })
    } catch (error) {
        return NextResponse.json("Internal Error", { status: 500 });
    }
}