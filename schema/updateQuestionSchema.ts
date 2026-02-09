import z from "zod";

export const updateQuestionSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(2)
})

export type UpdateQuestionSchema = z.infer<typeof updateQuestionSchema>