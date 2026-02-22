import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 });
        }

        const task = await db.task.findMany({
            where: {
                userId: session.user.id,
                dueDate: {
                    not: null,
                },
            },
            select: {
                id: true,
                title: true,
                dueDate: true,
                status: true,
                priority: true,
            },
        });

        const formatted = task.map((t) => ({
            id: t.id,
            title: t.title,
            status: t.status,
            dueDate: t.dueDate,
            priority: t.priority,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.log(error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}