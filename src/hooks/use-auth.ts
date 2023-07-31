import { SignUpPayload } from "@/lib/validators/signUp";
import { SignUpType } from "@/types/user-credentials";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useToast } from "./use-toast";

export const useSignUp = () => {
    const { toast } = useToast()
    const router = useRouter()

    return useMutation({
        mutationFn: async (inputs: SignUpType) => {
            const { username, email, password } = inputs;
            const payload: SignUpPayload = { username, email: email, password }

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