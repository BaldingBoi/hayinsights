import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetNonce = () =>
	useQuery({
		queryKey: ["nonce"],
		queryFn: async () => {
			const data = await (
				await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/nonce`)
			).data;

			return data as string;
		},
	});

export const useVerifyAddress = () =>
	useMutation({
		mutationFn: async ({
			address,
			nonce,
			signature,
		}: {
			address: string;
			nonce: string;
			signature: string;
		}) => {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_CHAT_API}/auth/verify`,
				{ address, nonce, signature }
			);
			return data as any;
		},
		onSuccess: ({ signature }) => {
			localStorage.setItem("signature", signature);
		},
	});
