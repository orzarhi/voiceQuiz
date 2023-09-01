import { domainConfig } from "@/config/domain"

export const useUsers = async () => {
    const { url } = domainConfig;

    const response = await fetch(`${url}/api/users`)

    const users = await response.json()

    return users
}
