import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

interface Props {
    params: { id: string }
}
export async function PATCH(request: Request, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            return NextResponse.json("User not Authenticated", { status: 401 })
        }
        const { id } = await params
        await db.notification.update({
            where: {
                id: id
            },
            data: {
                idRead: true
            }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Internal server error", { status: 500 })
    }
}