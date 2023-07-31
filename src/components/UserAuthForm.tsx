'use client'

import React, { FC, useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { signIn } from "next-auth/react"
import { Icons } from './Icons'
import { useToast } from '@/hooks/use-toast'


interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    title: string
}

export const UserAuthForm: FC<UserAuthFormProps> = ({ className, title, ...props }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()

    const icon = title === 'Google' ? <Icons.google className='w-4 h-4 mr-2' /> : <Icons.gitHub className='w-4 h-4 mr-2' />

    const loginWithGoogle = async () => {
        setIsLoading(true)
        try {
            if (title === 'Google') {
                return await signIn('google', { callbackUrl: '/' })
            }
            return await signIn('github', { callbackUrl: '/' })
        } catch (error) {
            toast({
                title: 'There was a problem',
                description: "There was an error logging in with google",
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn('flex justify-center', className)}{...props}>
            <Button
                onClick={loginWithGoogle}
                isLoading={isLoading}
                size='sm'
                className='w-full' variant='outline'>
                {isLoading ? null : icon}
                {title}
            </Button>
        </div>
    )

}