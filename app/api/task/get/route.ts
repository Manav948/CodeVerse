import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        const userId = await session?.user.id
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }
        const task = await db.task.findMany({
            where: {
                userId: userId
            },
            include: {
                activities: true,
                taskTags: {
                    include: {
                        tag: true
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        })
        return NextResponse.json(task)
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}