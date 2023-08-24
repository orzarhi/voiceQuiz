import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
