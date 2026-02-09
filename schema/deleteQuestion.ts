import z from "zod";

export const deleteQuestionSchema = z.object({
    questionId : z.string()
})

export type DeleteQuestionSchema = z.infer<typeof deleteQuestionSchema>