import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json("User Not Authenticated", { status: 401 })
        }
        const userId = session.user.id;
        const question = await db.question.findMany({
            where: {
                userId: userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        image: true
                    }
                },
                answer: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                image: true
                            }
                        }
                    },
                    orderBy : {
                        created_at : "asc"
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        })
        return NextResponse.json(question, { status: 200 })
    }
    catch (error) {
        console.log("Error While fetching Question", error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}