import { DomainConfig } from "@/types/domain";

export const domainConfig: DomainConfig = {
    url: process.env.NODE_ENV === 'development' ?
        process.env.DEV_URL :
        process.env.PROD_URL
}

