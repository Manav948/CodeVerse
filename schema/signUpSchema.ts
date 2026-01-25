import z from "zod";

export const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    username: z.string().min(2, "UserName must be at least 2 characters long")
})
export type SignUpSchema = z.infer<typeof signUpSchema>;