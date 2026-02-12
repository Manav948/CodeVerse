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
        username: string
        image: string | null
    }

    articleTags: {
        id: string
        name: string
    }[]
    isLiked: boolean,
    likeCount: number

    comments: {
        id: string
        commentText: string
        user: {
            id: string
            name: string | null
            username: string
        }
    }[]
}
