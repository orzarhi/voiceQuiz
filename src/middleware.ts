import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET_KEY })

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/users/:path*']
}