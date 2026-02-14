import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user.id) {
            return new Response("Unauthorized User", { status: 401 });
        }
        const userId = session.user.id
        const bookmarks = await db.bookMark.findMany({
            where: {
                userId
            },
            include: {
                post: {
                    include: {
                        user: true,
                        tags: { include: { tag: true } }
                    }
                },
                snippet: {
                    include: {
                        user: true,
                        tags: { include: { tag: true } }
                    }
                },
                question: {
                    include: {
                        user: true
                    }
                },
                article: {
                    include: {
                        user: true
                    }
                }
            },
            orderBy: {
                created_at: "desc"
            }
        })
        const transFormed = bookmarks.map((bookmark) => {
            if (bookmark.post) {
                return {
                    id: bookmark.id,
                    type: "post",
                    data: bookmark.post
                }
            }
            if (bookmark.snippet) {
                return {
                    id: bookmark.id,
                    type: "snippet",
                    data: bookmark.snippet
                }
            }

            if (bookmark.article) {
                return {
                    id: bookmark.id,
                    type: "article",
                    data: bookmark.article
                }
            }

            if (bookmark.question) {
                return {
                    id: bookmark.id,
                    type: "question",
                    data: bookmark.question
                }
            }
            return null
        })
        return NextResponse.json(transFormed.filter(Boolean), { status: 200 })
    } catch (error) {
        console.error("Bookmark Fetch Error:", error);
        return NextResponse.json("Internal Server Error", {
            status: 500,
        });
    }
}
