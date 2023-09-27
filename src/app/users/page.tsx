import { Users } from "@/components/Users";
import { domainConfig } from "@/config/domain";
import { REVALIDATE } from "@/config/revalidate";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const getData = async () => {
    const { url } = domainConfig
    return (await fetch(`${url}/api/users`, {
        next: {
            revalidate: REVALIDATE
        }
    })).json()
}

export default async function page({ }) {
    const session = await getAuthSession();
    if (!session?.user.isAdmin) redirect('/');

    // const users = await getData()

    return <Users />
}

