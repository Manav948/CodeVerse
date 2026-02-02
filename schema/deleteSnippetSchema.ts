import z from "zod";

export const deleteSnippetSchema = z.object({
    snippetId : z.string()
})
export type DeleteSnippetSchema = z.infer<typeof deleteSnippetSchema>