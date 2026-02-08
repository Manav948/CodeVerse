import z from "zod";

export const deletePostSchema = z.object({
    postId : z.string()
})

export type DeletePostSchema = z.infer<typeof deletePostSchema>