import { Header } from '@/components/Header';
import { Users } from "@/components/Users";
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function page({ }) {
    const session = await getAuthSession();

    if (!session?.user?.isAdmin) redirect('/')

    const URL = process.env.NODE_ENV === 'development' ?
        process.env.DEV_URL :
        process.env.PROD_URL

    const response = await fetch(`${process.env.PROD_URL}/api/users`)
    const users = await response.json()

    return (
        <>
            <Header session={session} />
            <Users users={users} />
        </>
    )

}

