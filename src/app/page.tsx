import { GameCard } from '@/components/GameCard';
import { UserAccountNav } from '@/components/UserAccountNav';
import logo from "@/images/logo.png";
import { getAuthSession } from '@/lib/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();

  if (!session) redirect('/sign-in');

  return (
    <>
      <main className='flex justify-between bg-zinc-300/40 border border-black/30 p-0.5 rounded-2xl'>
        <Image src={logo} className='not-drag w-12 sm:mt-1 sm:h-12 sm:w-16' alt='voice quiz' />
        <div className='mx-auto my-auto'>
          <h1 className=' sm:text-xl text-base font-bold text-transparent uppercase bg-clip-text bg-gradient-to-r from-purple-500 to-teal-600'>welcome to vice quiz</h1>
        </div>
        <UserAccountNav user={session.user} />
      </main>
      <GameCard />
    </>
  )

}
