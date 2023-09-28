import { Users } from "@/components/Users";
import { domainConfig } from "@/config/domain";
import { REVALIDATE } from "@/config/revalidate";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page({ }) {
    const session = await getAuthSession();
    if (!session?.user.isAdmin) redirect('/');

    const { url } = domainConfig

    const response = await fetch(`${url}/api/users`, { cache: 'no-store' })
    const users = await response.json()

    return <Users users={users} />
}

