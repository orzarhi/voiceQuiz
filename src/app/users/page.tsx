import { Header } from '@/components/Header';
import { Users } from "@/components/Users";
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function page({ }) {
    const session = await getAuthSession();

    if (!session?.user?.isAdmin) redirect('/')

    return (
        <>
            {/* @ts-ignore */}
            <Header session={session} />
            <Users />
        </>
    )

}

