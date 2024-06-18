'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { RANDOM_QUESTIONS, TOPICS } from "@/constants/levels";
import { useDropDownStore, useLevelStore } from "@/store";
import { LevelType, TopicType } from "@/types/level";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from 'next/link';
import { FC } from "react";
import { ModeToggle } from "./ModeToggle";
import { UserAvatar } from "./UserAvatar";
import { Button } from "./ui/Button";

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'image' | 'email' | 'isAdmin'>
}

export const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  const { level: levelStore, setLevel } = useLevelStore();
  const { dropDown, setDropDown } = useDropDownStore()

  const changeLevel = (id: string) => setLevel(id as LevelType)

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
      <DropdownMenuContent className='border dark:border-white/10 border-black/30' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user?.name && <p className='font-medium'>{user.name}</p>}
            {user?.email && <p className='w-[200px] truncate text-sm dark:text-zinc-200/70'>{user.email}</p>}
          </div>
          <ModeToggle />
        </div>
        <DropdownMenuSeparator />

        <div className="flex items-center justify-center">
          <span className="text-base underline">Select Random questions:</span>
        </div>

        <div className='grid items-center justify-center grid-cols-3 gap-2 p-2 place-items-center'>
          {RANDOM_QUESTIONS?.map((question) => (
            <DropdownMenuItem asChild className="drop-down-menu text-zinc-500/70 dark:text-zinc-200/70" key={question.id}>
              <Button
                size='sm'
                className={`w-16 rounded-lg ${question.id === levelStore ? "font-bold tracking-widest text-black dark:text-white p-5" : null}`}
                variant='ghost'
                onClick={() => changeLevel(question.id as LevelType)}
              >
                {question.label}
              </Button>
            </DropdownMenuItem>
          ))}
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 text-base font-medium rounded-xl">
            Or select topic:
          </span>
        </div>
        <div className='grid items-center justify-center grid-cols-3 gap-2 p-2 place-items-center'>
          {TOPICS?.map((topic, index: number) => (
            <DropdownMenuItem asChild className="drop-down-menu text-zinc-500/70 dark:text-zinc-200/70" key={index}>
              <Button
                size='sm'
                className={`w-16 rounded-lg ${topic.id === levelStore ? "font-bold tracking-widest text-black dark:text-white p-5" : null}`}
                variant='ghost'
                onClick={() => changeLevel(topic.id as TopicType)}
              >
                {topic.label}
              </Button>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {user?.isAdmin ?
          <>
            <DropdownMenuItem asChild className='drop-down-menu dark:hover:bg-zinc-700'>
              <Link href='/'>Home</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className='drop-down-menu dark:hover:bg-zinc-700'>
              <Link href='users'>Users</Link>
            </DropdownMenuItem>
          </> : null
        }


        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`
            })
          }}
          className='drop-down-menu dark:hover:bg-zinc-700'>
          Sign out
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu >
  )
}

