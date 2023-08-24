import { Header } from '@/components/Header';
import { Users } from "@/components/Users";
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function page({ }) {
    const session = await getAuthSession();

    if (!session?.user?.isAdmin) redirect('/')
    if (!session) redirect('/sign-in');

    const response = await fetch('http://localhost:3000/api/users')
    const users = await response.json()

    return (
        <>
            <Header session={session} />
            <Users users={users} />
        </>
    )

}

