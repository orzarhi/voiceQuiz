import bcrypt from 'bcrypt';
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInValidator } from './validators/signIn';
import { db } from './db';
import { User } from '@prisma/client';


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: { type: 'text', placeholder: 'test@test.com' },
                password: { type: 'password', placeholder: 'Pa$$w0rd' },
            },
            async authorize(credentials, req) {
                const { username, password } = signInValidator.parse(credentials);
                const user = await db.user.findUnique({
                    where: { username },
                });
                if (!user) return null;

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) return null;

                return user;
            },
        }),
    ],
    callbacks: {
        session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;
            return session;
        },
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
                token.username = (user as User).username;
                console.log({ user });
            }
            return token;
        },
    },
    pages: {
        signIn: '/auth',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET_KEY,
}
export const getAuthSession = () => getServerSession(authOptions)
