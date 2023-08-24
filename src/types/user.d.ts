export type UserType = {
    id: string;
    email: string;
    name?: string;
    username: string;
    password: string;
    emailVerified: Date | null;
    image?: string | null;
    isAdmin: boolean;
}