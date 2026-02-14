import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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

        const existingBookmark = await db.bookMark.findUnique({
            where: {
                userId_snippetId: {
                    userId,
                    snippetId
                }
            }
        })
        if (existingBookmark) {
            await db.bookMark.delete({
                where: {
                    userId_snippetId: {
                        userId,
                        snippetId
                    }
                }
            })
            return NextResponse.json({ bookmarked: false })
        }
        await db.bookMark.create({
            data: {
                userId,
                snippetId
            }
        })
        return NextResponse.json({ bookmarked: true })

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" },{ status: 500 })
    }
}