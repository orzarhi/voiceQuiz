import { domainConfig } from "@/config/domain";
import { REVALIDATE } from "@/config/revalidate";

export const useUsers = async () => {
    const { url } = domainConfig;

    try {
        const response = await fetch(`${url}/api/users`,
            {
                next: { 'revalidate': REVALIDATE }
            })
        const users = await response.json()

        return users
    } catch (error) {
        console.log(error)
    }
}