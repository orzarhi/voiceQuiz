import { LevelType } from "./level";

export type GameType = {
    score: number;
    level: LevelType | string;
    date?: date | string;
}