'use client'

import { useToast } from '@/hooks/use-toast'
import logo from "@/images/logo.png"
import { SignInRequest, signInValidator } from '@/lib/validators/signIn'
import { SignInType } from '@/types/user-credentials'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserAuthForm } from './UserAuthForm'
import { Button } from './ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Input } from './ui/Input'
import { Label } from './ui/Label'
import { ModeToggle } from './ModeToggle'

export const SignIn = ({ }) => {
    const { toast } = useToast()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { handleSubmit, register, formState: { errors } } = useForm<SignInRequest>({
        resolver: zodResolver(signInValidator)
    })

    const onSubmit = async (data: SignInType) => {
        setIsLoading(true)
        try {
            const status = await signIn('credentials', {
                username: data.username,
                password: data.password,
                redirect: false,
                callbackUrl: '/'
            })
            if (status?.error) {
                return toast({
                    title: status.error,
                    variant: 'destructive'
                })
            }
            // router.push(status?.url || '/')
            document.location.href = status?.url || '/'
        } catch (error) {
            toast({
                title: 'Something went wrong',
                description: 'please try again later.',
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center h-[90vh]'>
            <Card className='container p-3 shadow-2xl'>
                <div className='flex justify-between -mb-8'>
                    <ModeToggle />
                    <Image src={logo} className='w-16 not-drag sm:w-24' alt='voice quiz' />
                </div>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl ">Let&lsquo;s begin.</CardTitle>
                    <CardDescription>
                        Log in to an existing account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <UserAuthForm title='Google' />
                        <UserAuthForm title='Github' />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="px-2 rounded-xl">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="text"  {...register('username')} />
                        {errors?.username && (
                            <p className='px-1 text-xs text-red-600'>
                                {errors.username.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password"   {...register('password')} />
                        {errors?.password && (
                            <p className='px-1 text-xs text-red-600'>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button isLoading={isLoading} type='submit' className="w-full">Sign in</Button>
                </CardFooter>
                <div className='flex justify-start text-sm'>
                    <span className='flex w-full ml-2'>Don`t have an account? <p className='ml-2 underline cursor-pointer text-sky-500' onClick={() => router.push('/sign-up')}>Sign up</p></span>
                </div>
            </Card>
        </form>
    )
}