'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { LEVELS } from "@/constants/level";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { FC } from "react";
import { UserAvatar } from "./UserAvatar";
import { Button } from "./ui/Button";
import { Level } from "@/types/level";
import { useLevelStore } from "@/store/levelStore";

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email'>
}

export const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const { setLevel } = useLevelStore();

  const changeLevel = (level: Level) => setLevel(level)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className='sm:w-14 sm:h-14 w-10 h-10'
          user={{
            name: user.name || null,
            image: user.image || null
          }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white border border-black/30' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user?.name && <p className='font-medium'>{user.name}</p>}
            {user?.email && <p className='w-[200px] truncate text-sm text-zinc-700'>{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />

        <div className="flex items-center justify-center">
          <span className="underline">Choose a level:</span>
        </div>

        <div className='flex items-center justify-center gap-2 p-2'>
          {LEVELS?.map((level) => (
            <DropdownMenuItem asChild className="drop-down-menu" key={level.id}>
              <Button
                size='sm'
                className="w-16 rounded-lg"
                variant='ghost'
                onClick={() => changeLevel(level.id as Level)}
              >
                {level.label}
              </Button>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />
        <hr />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`
            })
          }}
          className='drop-down-menu'>
          Sign out
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

