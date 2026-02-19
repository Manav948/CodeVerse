import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Props {
    params: Promise<{ taskId: string }>
}
export async function POST(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            return NextResponse.json("User Not Authenticated", { status: 401 })
        }
        const { taskId } = await params
        const task = await db.task.update({
            where: {
                id: taskId,
                userId: session.user.id
            },
            data: {
                status: "COMPLETED"
            }
        })
        await db.taskActivity.create({
            data: {
                taskId,
                type: "TASK_COMPLETED"
            }
        })
        return NextResponse.json(task)
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}