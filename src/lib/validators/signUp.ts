import { z } from 'zod';

export const signUpValidator = z.object({
    name: z.string().min(3).max(25).regex(/^[a-zA-Zא-ת0-9\s]+$/, 'Invalid full name'),
    username: z.string().min(3).max(10).regex(/^[a-zA-Zא-ת0-9\s]+$/, 'Invalid username'),
    email: z.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Invalid email'),
    password: z.string().min(6).max(25).regex(/^[a-zA-Z0-9_]+$/, 'Invalid password')
})

export type SignUpRequest = z.infer<typeof signUpValidator>;
export type SignUpPayload = z.infer<typeof signUpValidator>;