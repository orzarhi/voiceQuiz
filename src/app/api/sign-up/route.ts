import { db } from '@/lib/db';
import { signUpValidator } from '@/lib/validators/signUp';
import { z } from 'zod';
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();


        const { username, email, password } = signUpValidator.parse(body);

        const emailExists = await db.user.findUnique({
            where: { email }
        })

        if (emailExists) {
            return new Response('User with this email already exists', { status: 409 })
        }

        const usernameExists = await db.user.findUnique({
            where: { username }
        })

        if (usernameExists) {
            return new Response('User with this username already exists', { status: 409 })
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        await db.user.create({
            data: {
                username,
                email,
                password: passwordHash
            }
        })
        return new Response('OK');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 })
        }
        return new Response('Something went wrong, please try again later.', { status: 500 })
    }
}