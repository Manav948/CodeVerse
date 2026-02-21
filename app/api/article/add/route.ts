import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addArticleSchema } from "@/schema/addArticleSchema";
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

        const body = await request.json();
        const parsed = addArticleSchema.safeParse(body);

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
        const userId = session.user.id;

        const article = await db.$transaction(async (tx) => {
            const tagRecords = await Promise.all(
                tags.map((name) =>
                    tx.tag.upsert({
                        where: { name },
                        update: {},
                        create: { name },
                    })
                )
            );
            const article = await tx.article.create({
                data: {
                    title,
                    description,
                    image,
                    links,
                    userId,
                    articleTags: {
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
                    articleTags: {
                        include: {
                            tag: true,
                        },
                    },
                },
            });

            await tx.user.update({
                where: { id: userId },
                data: {
                    lastActiveAt: new Date(),
                },
            });

            return article;
        });

        return NextResponse.json(article, { status: 201 });
    } catch (error) {
        console.error("Error creating Article:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
