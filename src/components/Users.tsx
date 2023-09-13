'use client'

import { formatDate } from '@/lib/utils';
import { useDropDownStore } from '@/store';
import { GameType } from '@/types/game';
import { UserType } from '@/types/user';
import { motion } from "framer-motion";
import { FC } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';
import { useUsers } from '@/hooks/use-users';
import { Loading } from './Loading';

interface UsersProps {

}

export const Users: FC<UsersProps> = ({ }) => {
    const { dropDown } = useDropDownStore()

    const { data: users, isLoading } = useUsers();

    if (isLoading) return <Loading />

    return (
        <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.2,
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
                        <TableHead>Admin</TableHead>
                        <TableHead>Attempts</TableHead>
                        <TableHead>Level</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user: UserType) => (
                        <TableRow key={user.email}>
                            <TableCell >{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{formatDate(user.createdAt)}</TableCell>
                            <TableCell>{user.isAdmin ? "✅" : "❌"}</TableCell>
                            <TableCell>{user?.game.length}</TableCell>
                            {user?.game.map((game: GameType, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className='text-xs'>
                                        {index + 1}. {game.level}
                                    </TableCell>
                                    <TableCell className='text-xs'>
                                        score {game.score} out of {game.questionsLength}
                                    </TableCell>
                                    <TableCell className='text-xs'>
                                        {formatDate(game.date)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    )
}