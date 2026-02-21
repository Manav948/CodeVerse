import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { updateArticleSchema } from "@/schema/updateArticleSchema"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

interface Props {
    params: Promise<{ articleId: string }>
}
export async function POST(request: NextRequest, { params }: Props) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })
        }
        const body = await request.json()
        const result = updateArticleSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json({ message: "Invalid request body" }, { status: 400 })
        }
        const { title, links, description, tags  } = result.data
        const { articleId } = await params

        const updateArticle = await db.article.update({
            where: {
                id: articleId
            },
            data: {
                title: title,
                description: description,
                links,
            }
        })
        if (!updateArticle) {
            return NextResponse.json({ message: "Article not found" }, { status: 404 })
        }
        return NextResponse.json(updateArticle, { status: 200 })
    } catch (error) {
        console.error("Error updating Article:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}
