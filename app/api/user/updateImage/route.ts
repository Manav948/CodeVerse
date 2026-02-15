import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }
        const { imageUrl } = await request.json()
        if (!imageUrl) {
            return NextResponse.json("Image Url is Requires", { status: 400 })
        }
        const updateUser = await db.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                image: imageUrl
            }
        })
        return NextResponse.json(updateUser, { status: 200 })
    } catch (error) {
        return NextResponse.json("Internal Error", { status: 500 });
    }
}