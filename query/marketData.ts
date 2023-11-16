// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Token } from "../lib/types";
// import mocklist from "./mocklist.json";

// export const useMarketData = ({
// 	symbol,
// 	from,
// 	to,
// }: {
// 	symbol: string;
// 	from: string;
// 	to: string;
// }) =>
// 	useQuery({
// 		queryKey: ["marketData"],
// 		queryFn: async () => {
// 			const { data } = await axios.get(
// 				`${process.env.NEXT_PUBLIC_API}/market/price-history/${symbol}?from=${from}&to=${to}`
// 			);
// 			return data;
// 		},
// 	});

// export const useCoinList = () =>
// 	useQuery({
// 		queryKey: ["coinList"],
// 		queryFn: async () => {
// 			const { data } = await axios.get(
// 				`${process.env.NEXT_PUBLIC_API}/market/listings`
// 			);
// 			if (data) return data as Token[];
// 			return [];
// 		},
// 	});

// export const useCoinInfo = (id?: string) =>
// 	useQuery({
// 		queryKey: ["coinInfo"],
// 		queryFn: async () => {
// 			const { data } = await axios.get(
// 				`${process.env.NEXT_PUBLIC_API}/market/current-price/${id}`
// 			);
// 			return data;
// 		},
// 	});
