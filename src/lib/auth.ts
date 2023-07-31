import bcrypt from 'bcrypt';
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInValidator } from './validators/signIn';
import { db } from './db';
import { User } from '@prisma/client';
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
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
                if (!user) throw new Error('Invalid username or password.');;

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) throw new Error('Invalid username or password.');

                return user;
            },
        }),
    ],
    callbacks: {
        session({ session, token }) {
            if (token) {
                session.user.id = token?.id;
                session.user.name = token?.name;
                session.user.email = token?.email;
                session.user.image = token?.picture;
                session.user.username = token?.username;
            }
            return session;

        },
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
                token.username = (user as User).username;
            }
            return token;
        },
        redirect() {
            return "/"
        },
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET_KEY,
}
export const getAuthSession = () => getServerSession(authOptions)
