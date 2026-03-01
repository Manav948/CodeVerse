import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { CreateNotification } from "@/types/notification"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

interface Props {
    params: Promise<{ snippetId: string }>
}
export async function POST(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }
        const userId = session.user.id
        const { snippetId } = await params

        const existingLikes = await db.snippetLike.findUnique({
            where: {
                snippetId_userId: {
                    userId,
                    snippetId

                }
            }
        })
        if (existingLikes) {
            await db.snippetLike.delete({
                where: {
                    snippetId_userId: {
                        userId,
                        snippetId
                    }
                }
            })
            return NextResponse.json({ liked: false })
        }
        await db.snippetLike.create({
            data: {
                userId,
                snippetId

            }
        })
        await CreateNotification({
            userId,
            type: "LIKE",
            title: "Liked snippet",
            message: `${session.user.username} Liked a snippet`,
        })
        return NextResponse.json({ liked: true })
    } catch (error) {
        return NextResponse.json("Internal Error", { status: 500 });
    }
}