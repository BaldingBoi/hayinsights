import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Txn, Order } from "@/lib/types";

export const useTxnHistory = (address: string | undefined, orderId?: String) =>
	useQuery({
		queryKey: ["txnHistory"],
		queryFn: async () => {
			if (!address) return;
			const { data } = await axios.get(
				`${
					process.env.NEXT_PUBLIC_API
				}/txn?account=${address}&orderId=${orderId || ""}`
			);
			return data as Txn[];
		},
	});

export const useOrderHistory = (address: string | undefined) =>
	useQuery({
		queryKey: ["orderHistory"],
		queryFn: async () => {
			if (!address) return;
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API}/order/${address}`
			);
			return data as Order[];
		},
	});
