import { GameType } from "./game";
import { LevelType } from "./level";

export type UserType = {
    id: string;
    email?: string | undefined | null;
    name: string;
    username?: string | undefined | null;
    password?: string | undefined | null;
    emailVerified?: Date | null;
    image?: string | null;
    isAdmin: boolean | undefined | null;
    game: GameType[]
}

export type SessionType = {
    user: UserType;
}