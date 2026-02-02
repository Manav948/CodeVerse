import z from "zod";

export const addSnippetSchema = z.object({
    email: z.string().email(),
    title: z.string().min(1, "Title is required"),
    code: z.string().min(1, "Code is required"),
    description: z.string().min(1, "Description is required"),
    visibility: z.enum(["PUBLIC", "PRIVATE", "SHARED"]).optional().default("PUBLIC"),
    language: z.enum([
        "HTML",
        "CSS",
        "React",
        "JAVASCRIPT",
        "TYPESCRIPT",
        "PYTHON",
        "JAVA",
        "C",
        "CPP",
        "GO",
        "RUST",
        "OTHER",
    ]),
    tags: z.array(z.string()).optional()
})
export type AddSnippetSchema = z.infer<typeof addSnippetSchema>