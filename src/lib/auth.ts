import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from './db';
import { signInValidator } from './validators/signIn';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true
        }),
        CredentialsProvider({
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = signInValidator.parse(credentials);
                const user = await db.user.findUnique({
                    where: { username },
                });
                if (!user) throw new Error('Invalid username or password.');;

                const isPasswordValid = await bcrypt.compare(password, user.password || '');

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
                session.user.isAdmin = token?.isAdmin;
            }
            return session;

        },
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.isAdmin = user.isAdmin;
                token.username = (user as User)?.username;
            }
            return token;
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
