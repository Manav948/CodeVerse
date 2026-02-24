import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }
        const userId = session.user.id
        const totalTask = await db.task.count({
            where: {
                userId
            }
        })

        const completedTask = await db.task.count({
            where: {
                userId,
                status: "COMPLETED"
            }
        })
        const pendingTask = await db.task.count({
            where: {
                userId,
                status: "PENDING"
            }
        })
        const inProgress = await db.task.count({
            where: {
                userId,
                status: "IN_PROGRESS"
            }
        })
        const overdueTasks = await db.task.count({
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

        const completionRate = totalTask === 0 ? 0 : Math.round((completedTask / totalTask) * 100)
        const activities = await db.taskActivity.findMany({
            where: {
                task: { userId },
                type: "TASK_COMPLETED"
            },
            select: {
                date: true
            }
        })

        const activityByDate: Record<string, number> = {}
        activities.forEach((activity) => {
            const date = dayjs(activity.date).format("YYYY-MM-DD")
            activityByDate[date] = (activityByDate[date] || 0) + 1
        })

        const last7DaysCompletion: number[] = []
        for (let i = 0; i <= 6; i++) {
            const date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
            last7DaysCompletion.push(activityByDate[date] || 0)
        }
        return NextResponse.json({
            totalTask,
            completedTask,
            pendingTask,
            inProgress,
            overdueTasks,
            completionRate,
            activityByDate,
            last7DaysCompletion
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal server error", { status: 500 })
    }
}