export type PostWithExtras = {
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

    tags: {
        id: string
        name: string
    }[]
    likeCount: number
    isLiked: boolean
    bookmarked : boolean
    comments?: {
        id: string
        commentText: string
        user: {
            id: string
            name: string | null
            username: string
        }
    }[]
}
