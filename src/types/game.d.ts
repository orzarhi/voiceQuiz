import { LevelType } from "./level";

export type GameType = {
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

