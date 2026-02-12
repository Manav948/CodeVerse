import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

interface Props {
    params: Promise<{ postId: string }>
}
export async function POST(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }
        const userId = session.user.id
        const {postId} = await params

        const existingLikes = await db.postLike.findUnique({
            where: {
                postId_userId: {
                    userId,
                    postId
                }
            }
        })
        if (existingLikes) {
            await db.postLike.delete({
                where: {
                    postId_userId: {
                        userId,
                        postId
                    }
                }
            })
            return NextResponse.json({ liked: false })
        }
        await db.postLike.create({
            data: {
                userId,
                postId
            }
        })
        return NextResponse.json({ liked: true })
    } catch (error) {
        return NextResponse.json("Internal Error", { status: 500 });
    }
}