'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { LEVELS } from "@/constants/level";
import { useDropDownStore, useLevelStore } from "@/store";
import { Level } from "@/types/level";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from 'next/link';
import { FC } from "react";
import { UserAvatar } from "./UserAvatar";
import { Button } from "./ui/Button";
import { ModeToggle } from "./ModeToggle";

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email' | 'isAdmin'>
}

export const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const { level: levelStore, setLevel } = useLevelStore();
  const { dropDown, setDropDown } = useDropDownStore()

  const changeLevel = (level: Level) => setLevel(level)

  return (
    <DropdownMenu onOpenChange={() => setDropDown(!dropDown)}>
      <DropdownMenuTrigger>
        <UserAvatar
          className='w-10 h-10 sm:w-14 sm:h-14'
          user={{
            name: user.name || null,
            image: user.image || null
          }} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='borderdark:border-white/10 border-black/30`' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user?.name && <p className='font-medium'>{user.name}</p>}
            {user?.email && <p className='w-[200px] truncate text-sm dark:text-zinc-200/70'>{user.email}</p>}
          </div>
          <ModeToggle />
        </div>
        <DropdownMenuSeparator />

        <div className="flex items-center justify-center">
          <span className="underline">Choose a level:</span>
        </div>

        <div className='flex items-center justify-center gap-2 p-2 '>
          {LEVELS?.map((level) => (
            <DropdownMenuItem asChild className="drop-down-menu text-zinc-500/70 dark:text-zinc-200/70" key={level.id}>
              <Button
                size='sm'
                className={`w-16 rounded-lg ${level.id === levelStore ? "font-bold tracking-widest text-black dark:text-white p-5" : null}`}
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
        {user?.isAdmin ?
          <>
            <DropdownMenuItem asChild className='drop-down-menu'>
              <Link href='/'>Home</Link>
            </DropdownMenuItem>


            < DropdownMenuItem asChild className='drop-down-menu'>
              <Link href='users'>Users</Link>
            </DropdownMenuItem>
          </> : null
        }

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
    </DropdownMenu >
  )
}

