'use client'

import React, { FC } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';
import { UserType } from '@/types/user';
import { useDropDownStore } from '@/store';
import { Button } from './ui/Button';

interface UsersProps {
    users: UserType[]
}

export const Users: FC<UsersProps> = ({ users }) => {

    const { dropDown } = useDropDownStore()
    return (
        <Table className={`border mt-10 ${dropDown ? "blur-[1.5px]" : null}`}>
            <TableCaption>List of all users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Admin</TableHead>
                    {/* <TableHead>Become a admin</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map((user: UserType) => (
                    <TableRow key={user.email}>
                        <TableCell >{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.isAdmin ? "✅" : "❌"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}