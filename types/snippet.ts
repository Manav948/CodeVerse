export type SnippetWithExtras = {
  id: string
  title: string
  description: string
  code: string
  language: string
  visibility: string
  created_at: string
  updated_at: string

  user?: {
    id: string
    name: string | null
    username: string
    image: string | null
  }

  tags: {
    id: string
    name: string
  }[]
  isLiked : boolean
  likeCount : number
  bookmarked : boolean

  comments?: {
    id: string
    commentText: string
    user: {
      id: string
      name: string | null
      username?: string
    }
  }[]
}
