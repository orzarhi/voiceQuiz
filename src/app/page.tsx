import { GameCard } from '@/components/GameCard';
import * as  questions from '@/data';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';


export default async function Home() {
  const session = await getAuthSession();

  if (!session) redirect('/sign-in');

  // const easyQuestions = await questions.getStoredEasyQuestions();
  // const mediumQuestions = await questions.getStoredMediumQuestions();
  // const hardQuestions = await questions.getStoredHardQuestions();

  return (
    <GameCard
    // easyQuestions={easyQuestions}
    // mediumQuestions={mediumQuestions}
    // hardQuestions={hardQuestions}
    />
  )
}
