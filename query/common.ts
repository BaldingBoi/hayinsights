import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SupportedToken } from "@/lib/types";

export const useSupportedToken = (chainId: number | undefined) =>
	useQuery({
		queryKey: ["txnHistory"],
		queryFn: async () => {
			if (!chainId) return;
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API}/common/token/${chainId}`
			);
			return data as SupportedToken[];
		},
	});
