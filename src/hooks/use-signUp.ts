import { SignUpPayload } from "@/lib/validators/signUp";
import { SignUpType } from "@/types/sign-up";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";

export const useSignUp = () => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: async (inputs: SignUpType) => {
            const { username, email, password } = inputs;
            const payload: SignUpPayload = { username, email, password }

            const { data } = await axios.post('/api/sign-up', payload);
            return data;
        },
        onSuccess: () => {
            toast({
                title: 'Registered successfully.',
                description: 'You can now log in.',
            })
        },
        onError: () => {
            console.log('error');
        }
    });
}