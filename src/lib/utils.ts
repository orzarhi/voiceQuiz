import { questionSets } from '@/config/questionSets';
import { QuestionType } from '@/types/question';
import { ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const textToSpeech = (text: string) => {
  if (text) {
    if ('speechSynthesis' in window) {
      const speechMsg = new SpeechSynthesisUtterance(text);
      speechMsg.lang = 'en-US';
      speechSynthesis.speak(speechMsg);
    } else {
      alert('Sorry your browser does not support this feature');
    }
  }
};

export const formatDate = (date: Date, newFormat?: string) => {
  const fm = newFormat || 'dd/MM/yyyy';

  return date ? format(new Date(date), fm) : '';
};

const randomQuestions = (questions: QuestionType[]) => questions.sort(() => Math.random() - 0.5)

export const randomAllQuestions = (level: string) => {
  const questions = questionSets[level];
  if (questions) {
    randomQuestions(questions);
  }
}

