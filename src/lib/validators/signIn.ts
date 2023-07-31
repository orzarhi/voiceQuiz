import { z } from 'zod';

export const signInValidator = z.object({
    username: z.string().min(3).max(10).regex(/^[a-zA-Z0-9_]+$/, 'Invalid username'),
    password: z.string().min(6).max(25).regex(/^[a-zA-Z0-9_]+$/, 'Invalid password')
})

export type SignInRequest = z.infer<typeof signInValidator>;
export type SignInPayload = z.infer<typeof signInValidator>;