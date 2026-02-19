import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Props {
    params: Promise<{ taskId: string }>
}
export async function DELETE(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        const { taskId } = await params
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
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
        await db.task.delete({
            where: {
                id: taskId
            }
        })
        return NextResponse.json("Task Deleted Successfully")
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal server error ", { status: 500 })
    }
}