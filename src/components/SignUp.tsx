'use client'

import { useToast } from '@/hooks/use-toast'
import { Icons } from './Icons'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from './ui'
import { useForm } from 'react-hook-form'
import { SignUpRequest, signUpValidator } from '@/lib/validators/signUp'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpType } from '@/types/sign-up'
import { useSignUp } from '@/hooks/use-signUp'


export const SignUp = ({ }) => {
    const { toast } = useToast()

    const { handleSubmit, register, formState: { errors } } = useForm<SignUpRequest>({
        resolver: zodResolver(signUpValidator)
    })


    const { mutate: signUp, isLoading } = useSignUp()

    const onSubmit = (data: SignUpType) => {
        const { name, email, password } = data;
        signUp(data)
        console.log("🚀 data:", data)
        try {

        } catch (error) {
            toast({
                title: 'There was a problem',
                description: "There was an error logging in with google",
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center items-center h-screen'>
            <Card className='container shadow-2xl'>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <Button variant="outline">
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
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
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text"  {...register('name')} />
                        {errors?.name && (
                            <p className='px-1 text-xs text-red-600'>
                                {errors.name.message}
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
                    <Button className="w-full">Create account</Button>
                </CardFooter>
            </Card>
        </form>
    )
}