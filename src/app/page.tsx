import { getAuthSession } from '@/lib/auth';
import { UserAccountNav } from '@/components/UserAccountNav';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';

export default async function Home() {

  const session = await getAuthSession();

  return (
    <main className='flex justify-end'>
      {session?.user ?
        <div className=''>
          <UserAccountNav user={session.user} />
        </div>
        :
        <Link href="sign-in" className={buttonVariants()}>Sign in</Link>
      }
    </main>
  )

}
