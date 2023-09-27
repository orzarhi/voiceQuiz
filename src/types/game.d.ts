import { LevelType } from "./level";

export type GameType = {
    id?: string;
    userId?: string;
    score: number;
    level: LevelType | string;
    questionsLength?: number | undefined;
    date?: date;
}

export type CurrentGameType = {
    currentQuestion: number,
    score: number,
    endGame: boolean,
    changeBackground: boolean,
}

