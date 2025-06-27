import { z } from "zod"

export const validateRegistrationData = (data: Record<string, string>) => {
    const schema = z.object({
        name: z.string().min(2, "Fullname must be at least 2 characters"),
        email: z.string().email("Enter a valid email"),
        username: z.string().min(3, "username must be at least 3 characters"),
        password: z.string().min(6, "Password must be at least 6 characters")
    })

    return schema.safeParse(data)
}

export const validateLoginData = (data: Record<string, string>) => {
    const schema = z.object({
        email: z.string().email("Enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters")
    })

    return schema.safeParse(data)
}

export const validateOnboardingData = (data: Record<string, string>) => {
    const schema = z.object({
        bio: z.string().optional(),
        preferredGenres: z.array(
            z.string()
        )
    })

    return schema.safeParse(data)
}