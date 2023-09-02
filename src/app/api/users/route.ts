import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await db.user.findMany({
            select: {
                name: true,
                username: true,
                email: true,
                isAdmin: true,
                createdAt: true,
                game: {
                    select: {
                        score: true,
                        level: true,
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