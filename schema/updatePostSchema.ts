import { z } from "zod";

export const updatePostSchema = z.object({
    title: z.string().min(2, "Title must be 2 characters").max(120, "Title is too long").optional(),
    description: z.string().min(1, "Description is required").max(5000).optional(),

    links: z.array(z.string()).max(10, "Max 10 links allowed").optional().default([]),

    tags: z.array(z.string().min(1).transform((t) => t.trim().toLowerCase()))
        .max(10, "Max 10 tags allowed")
        .optional()
        .default([]),
});

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
