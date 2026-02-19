import { z } from "zod";

export const taskCreateSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(5, "Content must be at least 5 characters"),
    dueDate: z.string().datetime({ message: "Invalid date format" }).optional().or(z.literal("")),
    isStudent: z.boolean(),
    githubRepo: z.string().optional(),
    githubUserName: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),
})
    .superRefine((data, ctx) => {
        // If student → require GitHub fields
        if (data.isStudent) {
            if (!data.githubRepo) {
                ctx.addIssue({
                    path: ["githubRepo"],
                    code: z.ZodIssueCode.custom,
                    message: "GitHub repository is required for students",
                });
            }

            if (!data.githubUserName) {
                ctx.addIssue({
                    path: ["githubUserName"],
                    code: z.ZodIssueCode.custom,
                    message: "GitHub username is required for students",
                });
            }
        }
    });

export type TaskCreateSchema = z.infer<typeof taskCreateSchema>