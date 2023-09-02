'use client'

import { useDropDownStore } from '@/store';
import { GameType } from '@/types/game';
import { UserType } from '@/types/user';
import { FC } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';

interface UsersProps {
    users?: UserType[]
}

export const Users: FC<UsersProps> = ({ users }) => {
    const { dropDown } = useDropDownStore()

    return (
        <Table className={`border mt-10 ${dropDown ? "blur-[1.5px]" : null}`}>
            <TableCaption>List of all users ({users?.length}).</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Best Score</TableHead>
                    <TableHead>Admin</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map((user: UserType, index: number) => (
                    <TableRow key={user.email}>
                        <TableCell >{index + 1}.</TableCell>
                        <TableCell >{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
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
    )
}