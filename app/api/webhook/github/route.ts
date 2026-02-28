import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import { error } from "console";
import { db } from "@/lib/db";
export async function POST(req: NextRequest) {
    try {
        const secret = process.env.GITHUB_WEBHOOK_SECRET!
        const signature = req.headers.get("x-hub-signature-256")
        const rawBody = await req.text()
        const hmac = crypto.createHmac("sha256", secret)
        const digest = "sha256=" + hmac.update(rawBody).digest("hex")

        if (!signature || !crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
        }

        const payload = JSON.parse(rawBody)
        if (payload.ref && payload.commits) {
            const repoUrl = payload.repository.html_url;
            const githubUsername = payload.sender.login;

            const tasks = await db.task.findMany({
                where: {
                    githubRepo: repoUrl,
                    githubUserName: githubUsername,
                    isStudent: true
                }
            })

            for (const task of tasks) {
                await db.taskActivity.create({
                    data: {
                        taskId: task.id,
                        type: "GITHUB_COMMIT"
                    }
                })
            }
        }
        return NextResponse.json({ success: true })
    } catch (error) {
        console.log("WebHook error", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 501 })
    }
}