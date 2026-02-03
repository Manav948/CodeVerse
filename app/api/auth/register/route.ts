import { db } from "@/lib/db";
import { signUpSchema } from "@/schema/signUpSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body: unknown = await request.json();
    const result = signUpSchema.safeParse(body)
    if (!result.success) {
        return NextResponse.json("Missing Field , Wrong Data", { status: 400 })
    }
    const { email, password, username } = result.data
    try {
        const existingUsername = await db.user.findUnique({
            where: {
                username,
            }
        })
        if (existingUsername) {
            return NextResponse.json("Username is already exist", { status: 409 })
        }
        const existedUser = await db.user.findUnique({
            where: {
                email
            }
        })
        if (existedUser) {
            return NextResponse.json("User Already Exists", { status: 409 })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await db.user.create({
            data: {
                email,
                username,
                name: username,
                hashedPassword
            }
        })
        return NextResponse.json("OK", { status: 200 })
    } catch (error) {
        return NextResponse.json("Something went wrong")
    }
}