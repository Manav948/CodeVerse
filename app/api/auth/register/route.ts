import { db } from "@/lib/db";
import { signUpSchema } from "@/schema/signUpSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { writeLimiter } from "@/lib/rateLimit"

export async function POST(request: Request) {
    try {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "anonymous";

        const { success, reset } = await writeLimiter.limit(`register:${ip}`);
        if (!success) {
            const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000);
            return NextResponse.json(
                { message: "Too many requests. Please try again later." },
                {
                    status: 429,
                    headers: { "Retry-After": String(retryAfterSeconds) },
                }
            )
        }

        const body: unknown = await request.json();
        const result = signUpSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json("Missing Field , Wrong Data", { status: 400 })
        }
        
        const { email, password, username } = result.data
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