import { z } from 'zod';

export const signUpValidator = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100)
})

export type SignUpRequest = z.infer<typeof signUpValidator>;
export type SignUpPayload = z.infer<typeof signUpValidator>;