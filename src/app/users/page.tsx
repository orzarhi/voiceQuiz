import { Users } from "@/components/Users";
import { domainConfig } from "@/config/domain";
import { REVALIDATE } from "@/config/revalidate";
import { getAuthSession } from "@/lib/auth";
import { UserType } from "@/types/user";
import { redirect } from "next/navigation";

export default async function page({ }) {
    const session = await getAuthSession();
    if (!session?.user.isAdmin) redirect('/');

    const { url } = domainConfig

    const response = await fetch(`${url}/api/users`, { cache: 'no-store' })
    const users: UserType[] = await response.json()

    return <Users users={users} />
}

