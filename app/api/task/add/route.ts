import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskCreateSchema } from "@/schema/taskCreateSchema";
import { CreateNotification } from "@/types/notification";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            return NextResponse.json("User Not Authenticated", { status: 401 })
        }
        const body = await request.json()
        const parsed = taskCreateSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(parsed.error.flatten(), { status: 400 })
        }
        const data = parsed.data
        const task = await db.task.create({
            data: {
                userId: session.user.id,
                title: data.title,
                content: data.content,
                dueDate: data.dueDate ? new Date(data.dueDate) : null,
                isStudent: data.isStudent,
                githubRepo: data.githubRepo,
                githubUserName: data.githubUserName,
                priority: data.priority
            }
        })
        await CreateNotification({
            userId: session.user.id,
            type: "TASK_REMINDER",
            title: "New Task Created",
            message: `${session.user.id} Created new Task`,
            entityId: task.id,
            entityType: "TASK"
        })
        return NextResponse.json(task, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}