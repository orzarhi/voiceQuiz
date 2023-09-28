import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
    try {
        const path = req.nextUrl.searchParams.get("path") || '/api/users';

        revalidatePath(path);

        const users = await db.user.findMany({
            select: {
                name: true,
                username: true,
                email: true,
                isAdmin: true,
                createdAt: true,
                game: {
                    select: {
                        id: true,
                        userId: true,
                        score: true,
                        level: true,
                        questionsLength: true,
                        date: true,
                    }
                },
            }
        });

        return new NextResponse(JSON.stringify(users))
    } catch (error) {
        return new Response("Internal server error", { status: 500 });
    }
}