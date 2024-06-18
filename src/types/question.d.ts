export type QuestionType = {
    questionText: string;
    answerOptions: AnswerType[];
}

export type AnswerType = {
    answerText: string;
    isCorrect: boolean;
}