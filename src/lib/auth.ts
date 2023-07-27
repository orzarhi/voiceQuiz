import bcrypt from 'bcrypt';
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await db.user.findFirst({
                    where: { username: credentials?.username },
                })

                if (!user) throw new Error('User does not exist.');

                const passwordMatch = await bcrypt.compare(credentials!.password, user.password);

                if (!passwordMatch) throw new Error('Invalid username or password.');

                console.log(user);

                return user;
            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        //@ts-ignore
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        //@ts-ignore
        async session({ session, token }) {
            session.user = token.user as any;
            return session;
        },
    },
}
export const getAuthSession = () => getServerSession(authOptions)
