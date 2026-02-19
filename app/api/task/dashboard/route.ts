import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        const userId = session?.user.id
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }
        const totalTask = await db.task.count({
            where: {
                userId: userId
            }
        })

        const completedTask = await db.task.count({
            where: {
                userId: userId,
                status: "COMPLETED"
            }
        })
        const activities = await db.taskActivity.findMany({
            where: {
                task: {
                    userId: userId
                }
            },
            orderBy: {
                date: "asc"
            }
        })

        const overdueTask = await db.task.count({
            where: {
                userId,
                status: {
                    not: "COMPLETED"
                },
                dueDate: {
                    lt: new Date()
                }
            }
        })

        return NextResponse.json({
            totalTask, completedTask,
            completionRate: totalTask === 0 ? 0 : Math.round((completedTask / totalTask) * 100),
            activities, overdueTask
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}