import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskUpdateSchema } from "@/schema/taskUpdateSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Props {
    params: Promise<{ taskId: string }>
}
export async function PATCH(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }

        const body = await request.json();
        const result = await taskUpdateSchema.safeParse(body)
        const { taskId } = await params
        if (!result.success) {
            return NextResponse.json(result.error.flatten(), { status: 400 })
        }
        const existingTask = await db.task.findFirst({
            where: {
                id: taskId,
                userId: session.user.id
            }
        })
        if (!existingTask) {
            return NextResponse.json("Task not Found", { status: 404 })
        }
        const updateTask = await db.task.update({
            where: {
                id: taskId
            },
            data: {
                ...result.data,
                dueDate: result.data.dueDate ? new Date(result.data.dueDate) : undefined,
            }
        })
        return NextResponse.json(updateTask)
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal server error", { status: 500 })
    }
}