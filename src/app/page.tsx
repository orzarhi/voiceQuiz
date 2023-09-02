import { GameCard } from '@/components/GameCard';
import { Header } from '@/components/Header';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();

  if (!session) redirect('/sign-in');

  return (
    <>
      {/* @ts-ignore */}
      <Header session={session} />
      <GameCard />
    </>
  )

}
