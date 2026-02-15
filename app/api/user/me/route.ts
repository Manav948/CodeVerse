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
        const user = await db.user.findUnique({
            where: {
                id: session?.user.id
            },
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
                email: true
            }
        })
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json("Internal Error", { status: 500 });
    }
}