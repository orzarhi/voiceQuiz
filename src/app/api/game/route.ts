import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { gameValidator } from "@/lib/validators/game";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 });
        }
        const body = await req.json();
        const { score, level, date } = gameValidator.parse(body);

        await db.game.create({
            data: {
                score,
                level,
                date,
                userId: session?.user?.id,
            },
        });

        return new Response("OK");

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 })
        }
        return new Response("Internal server error", { status: 500 });
    }
}