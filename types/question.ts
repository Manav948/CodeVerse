export type QuestionWithExtras = {
    id: string
    title: string
    description: string
    created_at: Date
    updated_at: Date
    isLiked : boolean
    bookmarked : boolean
    likeCount : number

    user: {
        id: string
        username: string
        image: string | null
    }
}
