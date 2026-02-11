import z from "zod";

export const addArticleSchema = z.object({
    title : z.string().min(2,"title is require"),
    description : z.string().min(2, "description is require"),
    image : z.array(z.string()),
    links : z.array(z.string()),
    tags : z.array(z.string())
})

export type AddArticleSchema = z.infer<typeof addArticleSchema>