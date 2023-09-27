import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./use-toast";

export const useUsers = () => {
    const { toast } = useToast();

    return useQuery({
        queryKey: ['users'],
        refetchOnWindowFocus: true,
        staleTime: 0,
        cacheTime: 0,
        refetchInterval: 0,
        queryFn: async () => {
            const { data } = await axios.get('/api/users');
            return data;
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'There was an error fetching the users.',
                variant: 'destructive',
            })
        },
    })
}
