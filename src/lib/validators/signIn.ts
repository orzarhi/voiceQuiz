import { z } from 'zod';

export const signInValidator = z.object({
    username: z.string().min(3).max(10).regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid username'),
    password: z.string().min(6).max(25)
})

export type SignInRequest = z.infer<typeof signInValidator>;
export type SignInPayload = z.infer<typeof signInValidator>;