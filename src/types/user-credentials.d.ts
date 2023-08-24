export type AuthData = {
    username: string;
    password: string;
}

export type SignUpType = AuthData & {
    name: string;
    email: string;
}

export type SignInType = AuthData;

