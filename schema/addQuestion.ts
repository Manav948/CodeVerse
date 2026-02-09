import z from "zod";

export const addQuestion = z.object({
    title: z.string().min(2, "title must be 2 latter"),
    description: z.string().min(2, "description must be 2 latter"),
})

export type AddQuestion = z.infer<typeof addQuestion>