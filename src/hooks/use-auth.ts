import { SignUpPayload } from "@/lib/validators/signUp";
import { SignUpType } from "@/types/sign-up";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { SignInType } from "@/types/sign-in";
import { SignInPayload } from "@/lib/validators/signIn";

export const useSignUp = () => {
    const { toast } = useToast()
    const router = useRouter()

    return useMutation({
        mutationFn: async (inputs: SignUpType) => {
            const { username, email, password } = inputs;
            const payload: SignUpPayload = { username, email, password }

            const { data } = await axios.post('/api/sign-up', payload);
            return data;
        },
        onSuccess: async () => {
            toast({
                title: 'Registered successfully.',
                description: 'You can now log in.',
            })
            router.push('/sign-in')
        },
        onError: () => {
            console.log('error');
        }
    });
}

export const useSignIn = () =>
    useMutation({
        mutationFn: async (inputs: SignInType) => {
            const { username, password } = inputs;
            const payload: SignInPayload = { username, password }

            const { data } = await axios.post('/api/sign-in', payload);
            return data;
        },
        onSuccess: async (data) => {
            signIn('credentials', {
                username: data.username,
                password: data.password,
                callbackUrl: '/'
            })
        },
        onError: () => {
            console.log('error');
        }
    });
