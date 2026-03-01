import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }
        const notification = await db.notification.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                created_at: "desc"
            }
        })
        return NextResponse.json(notification)
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal server Error", { status: 500 })
    }
}