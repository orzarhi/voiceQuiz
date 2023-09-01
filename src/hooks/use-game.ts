import { GamePayload } from "@/lib/validators/game";
import { GameType } from "@/types/game";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";

export const useGame = () => {
    const { toast } = useToast();

    return useMutation({
        mutationFn: async (inputs: GameType) => {
            const { score, level, date } = inputs;
            const payload: GamePayload = { score, level, date }

            const { data } = await axios.post('/api/game', payload);
            return data;
        },

        onSuccess: () => {
            toast({
                title: 'Great job!',
                description: 'Your result has been saved in the system.',
            })
        },
    });
}
