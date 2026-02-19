import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface Props {
    params: Promise<{ taskId: string }>
}
export async function POST(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const { taskId } = await params;

        const task = await db.task.findFirst({
            where: {
                id: taskId,
                userId: session.user.id
            }
        })
        if (!task) {
            return NextResponse.json("Task not Found", { status: 404 })
        }
        await db.taskActivity.create({
            data: {
                taskId,
                type: "MANUAL_PROGRESS",
            },
        });

        return NextResponse.json("Activity Added");
    } catch (error) {
        return NextResponse.json("Internal Error", { status: 500 });
    }
}
