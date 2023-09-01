/* eslint-disable react-hooks/rules-of-hooks */
import { Header } from '@/components/Header';
import { Users } from "@/components/Users";
import { useUsers } from '@/hooks/use-users';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function page({ }) {
    const session = await getAuthSession();

    if (!session?.user?.isAdmin) redirect('/')

    const users = await useUsers()

    return (
        <>
            {/* @ts-ignore */}
            <Header session={session} />
            <Users users={users} />
        </>
    )

}

