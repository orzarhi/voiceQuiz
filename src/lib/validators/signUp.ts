import { z } from 'zod';

export const signUpValidator = z.object({
    name: z.string().min(3).max(25),
    username: z.string().min(3).max(10).regex(/^[a-zA-Z0-9_]+$/, 'Invalid username'),
    email: z.string().email(),
    password: z.string().min(6).max(25).regex(/^[a-zA-Z0-9_]+$/, 'Invalid password')
})

export type SignUpRequest = z.infer<typeof signUpValidator>;
export type SignUpPayload = z.infer<typeof signUpValidator>;