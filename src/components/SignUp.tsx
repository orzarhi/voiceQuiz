'use client'

import { useSignUp } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { SignUpRequest, signUpValidator } from '@/lib/validators/signUp'
import { SignUpType } from '@/types/sign-up'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from "next/link"
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Label } from './ui/Label'
import { Input } from './ui/Input'

export const SignUp = ({ }) => {
    const { toast } = useToast()

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
            <Card className='container shadow-2xl p-3'>
                <Link href='/sign-in' className='float-right'>
                    <Button className='w-44' variant='subtle'>Sign in</Button>
                </Link>
                <CardHeader className="space-y-1">
                    <CardTitle className=" text-2xl">Create an account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
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
                    <Button isLoading={isLoading} className="w-full">Create account</Button>
                </CardFooter>

            </Card>
        </form>
    )
}