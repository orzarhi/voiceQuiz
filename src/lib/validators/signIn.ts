import { z } from 'zod';

export const signInValidator = z.object({
    email: z.string().email().trim(),
    password: z.string().min(6).max(100)
})

export type SignInRequest = z.infer<typeof signInValidator>;
export type SignInPayload = z.infer<typeof signInValidator>;