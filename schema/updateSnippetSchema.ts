import z from "zod";

export const updateSnippetSchema = z.object({
    title: z.string().min(1, "Title is required"),
    code: z.string().min(1, "Code is required"),
    description: z.string().min(1, "Description is required"),
    visibility: z.enum(["PUBLIC", "PRIVATE", "SHARED"]).optional().default("PUBLIC"),
    tags: z.array(z.string()).optional()
})
export type UpdateSnippetSchema = z.infer<typeof updateSnippetSchema>