import z from "zod";

export const addPostSchema = z.object({
    title: z.
        string()
        .min(2, "Title must be at least 2 characters")
        .max(120, "Title is too long"),

    description: z.
        string().
        min(1, "Description is required").
        max(5000),

    image: z
        .array(z.string().url("Invalid image URL")),

    links: z
        .array(z.string().url("Invalid link URL")),

    tags: z
        .array(z.string().min(1))
        .max(10, "Max 10 tags allowed")
})

export type AddPostSchema = z.infer<typeof addPostSchema>