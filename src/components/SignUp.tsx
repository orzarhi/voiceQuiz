'use client'

import { useSignUp } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { SignUpRequest, signUpValidator } from '@/lib/validators/signUp'
import { SignUpType } from '@/types/user-credentials'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from "next/link"
import { useForm } from 'react-hook-form'
import { Button } from './ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Input } from './ui/Input'
import { Label } from './ui/Label'
import logo from "@/images/logo.png"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const SignUp = ({ }) => {
    const { toast } = useToast()
    const router = useRouter()

    const { handleSubmit, register, formState: { errors } } = useForm<SignUpRequest>({
        resolver: zodResolver(signUpValidator)
    })

    const { mutate: signUp, isLoading } = useSignUp()

    const onSubmit = (data: SignUpType) => {
        try {
            signUp(data)
        } catch (error) {
            toast({
                title: 'Something went wrong',
                description: 'please try again later.',
                variant: 'destructive'
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center h-[90vh]'>
            <Card className='container p-3 shadow-2xl'>
                <div className='flex justify-between -mb-8'>
                    <Button type='button' className='w-44' onClick={() => router.push('/sign-in')} variant='subtle'>Sign in</Button>
                    <Image src={logo} className='not-drag sm:w-24 w-16' alt='voice quiz' />
                </div>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl ">Create an account
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to create your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">

                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text"  {...register('name')} />
                        {errors?.name && (
                            <p className='px-1 text-xs text-red-600'>
                                {errors.name.message}
                            </p>
                        )}
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
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com"   {...register('email')} />
                        {errors?.email && (
                            <p className='px-1 text-xs text-red-600'>
                                {errors.email.message}
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
                    <Button isLoading={isLoading} type='submit' className="w-full">Create account</Button>
                </CardFooter>

            </Card>
        </form>
    )
}