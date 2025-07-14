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

export const validateProfileData = (data: Record<string, string>) => {
    const schema = z.object({
        name: z.string().min(2, "Fullname must be at least 2 characters").optional(),
        username: z.string().min(3, "username must be at least 3 characters").optional(),
        bio: z.string().optional(),
        preferredGenres: z.array(
            z.string()
        ).optional()
    })

    return schema.safeParse(data)
}

export const validateUserFavouriteInfo = (data: Record<string, string | number | Date>) => {
    const schema = z.object({
        id: z.number(),
        title: z.string().optional(),
        name: z.string().optional(),
        first_air_date: z.string().optional(),
        release_date: z.string().optional(),
        poster_path: z.string(),
        vote_average: z.number(),
        media_type: z.enum(["movie", "tv"])
    })

    return schema.safeParse(data)
}