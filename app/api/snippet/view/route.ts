import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const snippetId = searchParams.get("postId");

        if (!snippetId) {
            return NextResponse.json({ message: "Snippet ID is required" }, { status: 400 });
        }

        const snippet = await db.snippet.findUnique({
            where: {
                id: snippetId,
            },
            include: {
                user: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
                snippetLikes: true,
                bookmark: {
                    where: {
                        userId: session.user.id,
                    },
                },
            },
        });

        if (!snippet) {
            return NextResponse.json({ message: "snippet not found" }, { status: 404 });
        }

        const transformedSnippet = {
            ...snippet,
            tags: snippet.tags.map(pt => pt.tag),
            likeCount: snippet.snippetLikes.length,
            isLiked: snippet.snippetLikes.some(like => like.userId === session.user.id),
            bookmarked: snippet.bookmark.length > 0,
        };

        return NextResponse.json(transformedSnippet);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}