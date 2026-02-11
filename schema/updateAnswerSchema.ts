import z from "zod";

export const updateAnswerSchema = z.object({
    description : z.string().min(2)
})

export type UpdateDeleteSchema = z.infer<typeof updateAnswerSchema>