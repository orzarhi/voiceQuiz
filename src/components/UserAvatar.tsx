import { User } from 'next-auth'
import React, { FC } from 'react'
import { Avatar, AvatarFallback } from './ui/Avatar'
import Image from 'next/image'
import { Icons } from './Icons'
import { AvatarProps } from '@radix-ui/react-avatar'

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'name' | 'image'>

}

export const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
    return (
        <Avatar {...props}>
            {user.image ? <div className='relative w-full h-full aspect-square'>
                <Image fill
                    src={user.image}
                    alt='profile picture'
                    referrerPolicy='no-referrer'
                />
            </div>
                :
                <AvatarFallback>
                    <span className='sr-only'>{user?.name}</span>
                    <Icons.user className="w-4 h-4" />
                </AvatarFallback>
            }
        </Avatar>
    )
}