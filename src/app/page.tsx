import { getAuthSession } from '@/lib/auth';
import { UserAccountNav } from '@/components/UserAccountNav';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';

export default async function Home() {

  const session = await getAuthSession();

  return (
    <>
      {session?.user ?
        <UserAccountNav user={session.user} />
        :
        <Link href="sign-in" className={buttonVariants()}>Sign in</Link>
      }

    </>)

}
