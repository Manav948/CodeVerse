import z from "zod";

export const deleteArticleSchema = z.object({
    articleId : z.string()
})

export type DeleteArticleSchema = z.infer<typeof deleteArticleSchema>