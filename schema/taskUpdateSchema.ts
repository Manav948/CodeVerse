import z from "zod";

export const taskUpdateSchema = z.object({
    title: z.string().min(2),
    content: z.string().min(2),
    dueDate: z.string(),
    isStudent: z.boolean(),
    githubRepo: z.string(),
    githubUserName: z.string(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"])
})

export type TaskUpdateSchema = z.infer<typeof taskUpdateSchema>