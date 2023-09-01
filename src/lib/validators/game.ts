import { z } from 'zod';

export const gameValidator = z.object({
    score: z.number().min(0).max(100),
    level: z.string(),
    date: z.string().transform(str => new Date(str)),
})

export type GameRequest = z.infer<typeof gameValidator>;
export type GamePayload = z.infer<typeof gameValidator>;