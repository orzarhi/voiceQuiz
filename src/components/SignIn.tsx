'use client'

import { useToast } from '@/hooks/use-toast'
import { SignInRequest, signInValidator } from '@/lib/validators/signIn'
import { SignInType } from '@/types/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { UserAuthForm } from './UserAuthForm'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from './ui'
import { useSignIn } from '@/hooks/use-auth'

export const SignIn = ({ }) => {
    const { toast } = useToast()

    const { handleSubmit, register, formState: { errors } } = useForm<SignInRequest>({
        resolver: zodResolver(signInValidator)
    })

    const { mutate: signIn, isLoading } = useSignIn()

    const onSubmit = (data: SignInType) => {
        try {
            signIn(data)
        } catch (error) {
            toast({
                title: 'Something went wrong 🤨',
                description: 'please try again later.',
                variant: 'destructive'
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center h-[90vh]'>
                <Card className='container shadow-2xl p-3'>
                    <Link href='/sign-up' className='float-right'>
                        <Button className=' w-44' variant='subtle'>Create account</Button>
                    </Link>
                    <CardHeader className="space-y-1">
                        <CardTitle className=" text-2xl"> Let&lsquo;s begin.</CardTitle>
                        <CardDescription>
                            Log in to an existing account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">

                        <div className="grid grid-cols-2 gap-6">
                            <UserAuthForm title='Google' />
                            <UserAuthForm title='gitHub' />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
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
                        <Button isLoading={isLoading} className="w-full">Sign in</Button>
                    </CardFooter>

                </Card>
            </form>
        </>
    )
}