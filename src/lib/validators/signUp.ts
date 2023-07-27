import { z } from 'zod';

export const signUpValidator = z.object({
    username: z.string().min(3).max(10).regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid username'),
    email: z.string().email(),
    password: z.string().min(6).max(25)
})

export type SignUpRequest = z.infer<typeof signUpValidator>;
export type SignUpPayload = z.infer<typeof signUpValidator>;