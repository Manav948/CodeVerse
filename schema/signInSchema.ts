import z from "zod";

export const password = z
    .string()
    .refine((password) => password.length >= 6, {
        message: "Password must be 6 character"
    })
    .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain uppercase latter"
    })
    .refine((password) => /\d/.test(password), {
        message: "Password must contain Digits"
    })

export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})
export type SignInSchema = z.infer<typeof signInSchema>;