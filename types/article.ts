import { CommentWithUser } from "./post"

export type ArticleWithExtras = {
    id: string
    title: string
    description: string
    image: string[]
    links: string[]
    created_at: Date
    updated_at: Date

    user: {
        id: string
        name: string | null
        username: string | null
        image: string | null
    }

    articleTags: {
        id: string
        name: string
    }[]
    isLiked: boolean,
    likeCount: number
    bookmarked : boolean

    comments?: CommentWithUser[]
    commentCount?: number
}
