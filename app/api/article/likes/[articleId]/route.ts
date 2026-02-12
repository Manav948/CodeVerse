import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

interface Props {
    params: Promise<{ articleId: string }>
}
export async function POST(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }
        const userId = session.user.id
        const {articleId} = await params

        const existingLikes = await db.articleLikes.findUnique({
            where: {
                articleId_userId: {
                    userId,
                    articleId
                    
                }
            }
        })
        if (existingLikes) {
            await db.articleLikes.delete({
                where: {
                    articleId_userId: {
                        userId,
                        articleId
                    }
                }
            })
            return NextResponse.json({ liked: false })
        }
        await db.articleLikes.create({
            data: {
                userId,
                articleId
                
            }
        })
        return NextResponse.json({ liked: true })
    } catch (error) {
        return NextResponse.json("Internal Error", { status: 500 });
    }
}