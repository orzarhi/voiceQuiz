import { getAuthSession } from '@/lib/auth';
import { useSession } from 'next-auth/react'

export default async function Home() {

  const session = await getAuthSession();
  console.log("🚀 data:", session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  )
}
