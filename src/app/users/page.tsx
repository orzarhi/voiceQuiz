import { Users } from "@/components/Users";
import { domainConfig } from "@/config/domain";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const getData = async () => {
    const { url } = domainConfig
    return (await fetch(`${url}/api/users`, { cache: 'no-cache' })).json()
}

export default async function page({ }) {
    const session = await getAuthSession();

    if (!session?.user.isAdmin) redirect('/');

    const users = await getData()

    return <Users users={users} />
}

