import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addPostSchema } from "@/schema/addPostSchema";
import { CreateNotification } from "@/types/notification";
import { writeLimiter } from "@/lib/rateLimit";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "User not authenticated" },
                { status: 401 }
            );
        }

        const userId = session.user.id;

        const { success, reset } = await writeLimiter.limit(userId);
        if (!success) {
            const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000);
            return NextResponse.json(
                { message: "Too many requests. Please try again later." },
                {
                    status: 429,
                    headers: { "Retry-After": String(retryAfterSeconds) },
                }
            );
        }

        const body = await request.json();
        const parsed = addPostSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    message: "Invalid request body",
                    errors: parsed.error.flatten(),
                },
                { status: 400 }
            );
        }

        const { title, description, tags = [], image = [], links = [] } = parsed.data;

        const post = await db.$transaction(async (tx) => {
            const tagRecords = await Promise.all(
                tags.map((name) =>
                    tx.tag.upsert({
                        where: { name },
                        update: {},
                        create: { name },
                    })
                )
            );
            const post = await tx.post.create({
                data: {
                    title,
                    description,
                    image,
                    links,
                    userId,
                    tags: {
                        create: tagRecords.map((tag) => ({
                            tagId: tag.id,
                        })),
                    },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            image: true,
                        },
                    },
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                },
            });

            await CreateNotification({
                userId,
                type: "NEW_POST",
                title: "New Post Published",
                message: `${session.user.username} created new post`,
                entityId: post.id,
                entityType: "POST"
            })

            await tx.user.update({
                where: { id: userId },
                data: {
                    lastActiveAt: new Date(),
                },
            });

            return post;
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
