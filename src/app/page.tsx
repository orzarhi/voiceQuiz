import { GameCard } from '@/components/GameCard';
import { UserAccountNav } from '@/components/UserAccountNav';
import { buttonVariants } from '@/components/ui/Button';
import logo from "@/images/logo.png";
import { getAuthSession } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const session = await getAuthSession();

  return (
    <>
      <main className='flex justify-between bg-zinc-200 rounded-2xl'>
        <Image src={logo} className='w-14' alt='voice quiz' />
        <div className='mx-auto my-auto'>
          <h1 className='uppercase font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-teal-600'>welcome to vice quiz</h1>
        </div>
        {session?.user ?
          <UserAccountNav user={session.user} />
          :
          <Link href="sign-in" className={buttonVariants()}>Sign in</Link>
        }
      </main>
      <div>
        <GameCard />
      </div>
    </>
  )

}
