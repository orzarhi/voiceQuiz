import { db } from '@/lib/db';
import { signUpValidator } from '@/lib/validators/signUp';
import { z } from 'zod';
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, username, email, password } = signUpValidator.parse(body);

        const user = await db.user.findUnique({
            where: { email }
        })

        if (user?.email === email) {
            return new Response('User with this email already exists.', { status: 409 })
        }

        if (user?.name === name) {
            return new Response('User with this name already exists.', { status: 409 })
        }

        if (user?.username === username) {
            return new Response('User with this username already exists.', { status: 409 })
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        await db.user.create({
            data: {
                name,
                username,
                email,
                password: passwordHash
            }
        })

        return new Response('OK');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed.', { status: 422 })
        }
        return new Response('Something went wrong, please try again later.', { status: 500 })
    }
}