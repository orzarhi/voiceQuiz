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

    const users = await getData()
    console.log("🚀 users:", users)

    // return <Users users={users} />
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{user.game.length}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

