'use client'

import { useSignUp } from '@/hooks/use-signUp'
import { useToast } from '@/hooks/use-toast'
import { SignUpRequest, signUpValidator } from '@/lib/validators/signUp'
import { SignUpType } from '@/types/sign-up'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { UserAuthForm } from './UserAuthForm'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from './ui'
import { useState } from 'react'

export const Auth = ({ }) => {
    const { toast } = useToast()

    const [signInForm, setSignInForm] = useState<boolean>(false)

    const { handleSubmit, register, formState: { errors } } = useForm<SignUpRequest>({
        resolver: zodResolver(signUpValidator)
    })


    const { mutate: signUp, isLoading } = useSignUp()

    const onSubmit = (data: SignUpType) => {
        try {
            signUp(data)

        } catch (error) {
            toast({
                title: 'There was a problem',
                description: "There was an error logging in with google",
            })
        }
    }

    return (
        <>
            <div className='flex justify-end -mb-14'>
                <Button className=' w-44' variant='subtle' onClick={() => setSignInForm(!signInForm)}>{!signInForm ? 'Create account' : 'Sign in'}</Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center h-[90vh]'>
                <Card className='container shadow-2xl p-3'>
                    <CardHeader className="space-y-1">
                        <CardTitle className=" text-2xl"> {signInForm ? 'Create an account' : 'Let`s begin.'}</CardTitle>
                        <CardDescription>
                            {signInForm ? 'Enter your email below to create your account.' : 'Log in to an existing account.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {!signInForm &&
                            <div className="grid grid-cols-2 gap-6">
                                <UserAuthForm title='Google' />
                                <UserAuthForm title='gitHub' />
                            </div>}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            {!signInForm && <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>}
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
                        {signInForm && <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com"   {...register('email')} />
                            {errors?.email && (
                                <p className='px-1 text-xs text-red-600'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>}
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
                        <Button isLoading={isLoading} className="w-full">{signInForm ? 'Create account' : 'Sign in'}</Button>
                    </CardFooter>

                </Card>
            </form>
        </>
    )
}