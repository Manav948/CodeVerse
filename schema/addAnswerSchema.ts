import z from "zod";

export const addAnswerSchema = z.object({
    questionId: z.string(),
    description: z.string().min(5000, "Description Required")
})

export type AddAnswerSchema = z.infer<typeof addAnswerSchema>