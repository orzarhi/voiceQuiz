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
      <main className={`flex justify-between bg-${session?.user ? 'zinc-300/90' : 'white'}  p-0.5 rounded-2xl`}>
        {session?.user && <Image src={logo} className='not-drag w-14' alt='voice quiz' />}
        <div className='mx-auto my-auto'>
          <h1 className='text-2xl font-bold text-transparent uppercase bg-clip-text bg-gradient-to-r from-purple-500 to-teal-600'>{`${session?.user ? 'welcome to vice quiz' : 'Login and let`s get started!'}`}</h1>
        </div>
        {session?.user ?
          <UserAccountNav user={session.user} />
          :
          <Link href="sign-in" className={buttonVariants()}>Sign in</Link>
        }
      </main>
      {session?.user && <GameCard />}
    </>
  )

}
