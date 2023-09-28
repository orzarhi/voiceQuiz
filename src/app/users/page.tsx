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

    // return <Users users={users} />
    return (
        <>
            {users.map((user, index: number) => (
                <div key={user.id}>
                    <h1>{index + 1}. {user.name}</h1>
                    <p>{user.email}</p>
                    <p>{new Date().toLocaleTimeString()}</p>
                    <hr />
                </div>
            ))}
        </>
    )
}

