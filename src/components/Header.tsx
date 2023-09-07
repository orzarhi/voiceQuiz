'use client'

import logo from "@/images/logo.png";
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { UserAccountNav } from './UserAccountNav';
import { SessionType, UserType } from "@/types/user";
import { motion } from "framer-motion";

interface HeaderProps {
  session: SessionType
}

export const Header: FC<HeaderProps> = ({ session }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <main className='flex justify-between border dark:border-white/20 border-black/10 p-0.5 rounded-2xl'>
        <Link href='/'>
          <Image src={logo} className='not-drag w-12 sm:mt-1 sm:h-12 sm:w-16 cursor-pointer' alt='voice quiz' />
        </Link>
        <div className='mx-auto my-auto'>
          <h1 className='dark:bg-red-500 sm:text-xl text-base font-bold text-transparent uppercase bg-clip-text bg-gradient-to-r from-purple-500 to-teal-600'>welcome to voice quiz</h1>
        </div>
        <UserAccountNav user={session.user} />
      </main>
    </motion.div>
  )
}