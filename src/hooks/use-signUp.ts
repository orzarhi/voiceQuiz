import { SignUpPayload } from "@/lib/validators/signUp";
import { SignUpType } from "@/types/sign-up";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";
import { signIn } from 'next-auth/react';

export const useSignUp = () => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: async (inputs: SignUpType) => {
            const { username, email, password } = inputs;
            const payload: SignUpPayload = { username, email, password }

            const { data } = await axios.post('/api/sign-up', payload);
            return data;
        },
        onSuccess: async (data) => {
            toast({
                title: 'Registered successfully.',
                description: 'You can now log in.',
            })
            await signIn('credentials', {
                username: 'orz',
                password: '123456',
                callbackUrl: '/',
            });
        },
        onError: () => {
            console.log('error');
        }
    });
}