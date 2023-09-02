import { GameType } from "./game";
import { LevelType } from "./level";

export type UserType = {
    id: string;
    email: string;
    createdAt: Date;
    name: string;
    username?: string | undefined;
    password?: string | undefined;
    emailVerified?: Date | undefined;
    image?: string | undefined;
    isAdmin: boolean;
    game: GameType[]
}

export type SessionType = {
    user: UserType;
}