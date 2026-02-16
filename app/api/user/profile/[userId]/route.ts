import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Props {
    params: Promise<{ userId: string }>
}
export async function GET(request: Request, { params }: Props) {
    const { userId } = await params
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            return NextResponse.json("unAuthorized User", { status: 401 })
        }
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            include: {
                posts: {
                    orderBy: { created_at: "desc" }
                },
                articles: {
                    orderBy: { created_at: "desc" }
                },
                snippets: {
                    orderBy: { created_at: "desc" }
                },
                questions: {
                    orderBy: { created_at: "desc" }
                },
                _count: {
                    select: {
                        posts: true,
                        snippets: true,
                        questions: true,
                        articles: true,
                    }
                }
            },
        })
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json("Intrenal server error ", { status: 500 })
    }
}