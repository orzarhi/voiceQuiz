'use client'

import { Users } from "@/components/Users";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function page({ }) {
    const { data: session } = useSession()

    if (!session?.user?.isAdmin) redirect('/')

    return <Users />
}

