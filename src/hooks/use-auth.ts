import { SignUpPayload } from "@/lib/validators/signUp";
import { SignUpType } from "@/types/user-credentials";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useToast } from "./use-toast";
import { ErrorType } from "@/types/error";

export const useSignUp = () => {
    const { toast } = useToast()
    const router = useRouter()

    return useMutation({
        mutationFn: async (inputs: SignUpType) => {
            const { name, username, email, password } = inputs;
            const payload: SignUpPayload = { name, username, email, password }

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
        onError: (error: ErrorType) => {
            return toast({
                title: error?.response.data || 'Something went wrong.',
                variant: 'destructive'
            })
        }
    });
}