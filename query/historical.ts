import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useNikkei225Historical = (days?: number) =>
    useQuery({
        queryKey: ["historical", "nikkei225"],
        queryFn: async () => {
            const { data } = await axios.get(`/api/historical?days=${days}`);
            return data as any;
        },
    });
