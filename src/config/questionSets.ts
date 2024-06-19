import { AnimalsQuestions, ColorsQuestions, EasyQuestions, FruitsAndVegetablesQuestions, HardQuestions, MediumQuestions } from "@/constants/questions";
import { QuestionType } from "@/types/question";

type QuestionSetType = {
    [key: string]: QuestionType[];
}

export const questionSets: QuestionSetType = {
    'Easy': EasyQuestions,
    'Medium': MediumQuestions,
    'Hard': HardQuestions,
    'Animals': AnimalsQuestions,
    'Colors': ColorsQuestions,
    'FruitsAndVegetables': FruitsAndVegetablesQuestions
};