import { Header } from '@/components/Header';
import { Users } from "@/components/Users";
import { domainConfig } from '@/config/domain';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const dataUsers = async () => (await fetch(`${domainConfig.url}/api/users`, { cache: 'no-store' })).json()


export default async function page({ }) {
    const session = await getAuthSession();

    if (!session?.user?.isAdmin) redirect('/')

    const users = await dataUsers();

    return (
        <>
            {/* @ts-ignore */}
            <Header session={session} />
            <Users users={users} />
        </>
    )

}

