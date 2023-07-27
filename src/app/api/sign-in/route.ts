import { db } from "@/lib/db";
import { signInValidator } from "@/lib/validators/signIn";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();

        const { username, password } = signInValidator.parse(body);

        const usernameExists = await db.user.findUnique({
            where: { username }
        })

        if (!usernameExists) {
            return new Response('User does not exist.', { status: 404 })
        }

        const passwordMatch = await bcrypt.compare(password, usernameExists.password);

        if (!passwordMatch) {
            return new Response('Invalid password.', { status: 401 })
        }


        return new Response('OK');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 })
        }
        return new Response('Something went wrong, please try again later.', { status: 500 })
    }
}