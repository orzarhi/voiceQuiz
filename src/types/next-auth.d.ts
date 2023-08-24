import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId;
        username?: string | null;
        isAdmin?: boolean | null;
    }

}
declare module 'next-auth' {
    interface Session {
        user: User & {
            id: UserId;
            username?: string | null;
            isAdmin?: boolean | null;
        }
    }
    interface User {
        id: string;
        isAdmin?: boolean | null;
    }

}