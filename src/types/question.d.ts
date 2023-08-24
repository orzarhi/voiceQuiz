export type QuestionType = {
    questionText: string;
    answerOptions: AnswerType[];
}

export type AnswerType = {
    id: number;
    answerText: string;
    isCorrect: boolean;
}