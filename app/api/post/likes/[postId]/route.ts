import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { CreateNotification } from "@/types/notification"
import { writeLimiter } from "@/lib/rateLimit"
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

        const { success, reset } = await writeLimiter.limit(userId)
        if (!success) {
            const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000)
            return NextResponse.json(
                { message: "Too many requests. Please try again later." },
                {
                    status: 429,
                    headers: { "Retry-After": String(retryAfterSeconds) },
                }
            )
        }

        const { postId } = await params

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

        await CreateNotification({
            userId,
            type: "LIKE",
            title: "Liked post",
            message: `${session.user.username} Liked a post`,
        })
        return NextResponse.json({ liked: true })
    } catch (error) {
        return NextResponse.json("Internal Error", { status: 500 });
    }
}