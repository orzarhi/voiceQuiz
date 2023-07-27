import { SignUpPayload } from "@/lib/validators/signUp";
import { SignUpType } from "@/types/sign-up";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useSignUp = () =>
    useMutation({
        mutationFn: async (inputs: SignUpType) => {
            const payload: SignUpPayload = { name: inputs.name, email: inputs.email, password: inputs.password }

            const { data } = await axios.post('/api/sign-up', payload);
            return data;
        },
        onSuccess: () => {
            console.log('success');
        },
        onError: () => {
            console.log('error');
        }
    });