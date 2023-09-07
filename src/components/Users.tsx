'use client'

import { useDropDownStore } from '@/store';
import { GameType } from '@/types/game';
import { UserType } from '@/types/user';
import { FC } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';
import { formatDate } from '@/lib/utils';
import { useUsers } from '@/hooks/use-users';
import Loading from '@/components/Loading';
import { motion } from "framer-motion";

interface UsersProps {
}

export const Users: FC<UsersProps> = () => {
    const { data: users, isLoading } = useUsers()
    const { dropDown } = useDropDownStore()

    if (isLoading) return <Loading />

    return (
        <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            <Table className={`border mt-10 ${dropDown ? "blur-[1.5px]" : null}`}>
                <TableCaption>List of all users ({users?.length}).</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>Attempts</TableHead>
                        <TableHead>Best Score</TableHead>
                        <TableHead>Admin</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user: UserType) => (
                        <TableRow key={user.email}>
                            <TableCell >{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{formatDate(user.createdAt)}</TableCell>
                            <TableCell>{user?.game.length}</TableCell>
                            <TableCell>
                                {user?.game.reduce(
                                    (maxScore: number, game: GameType) => (game.score > maxScore ? game.score : maxScore),
                                    0
                                )}
                            </TableCell>
                            <TableCell>{user.isAdmin ? "✅" : "❌"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    )
}