// import { useMutation, UseMutationOptions } from "@tanstack/react-query";
// import axios from "axios";
// import { Message } from "@/lib/types";
// import { useAccount } from "wagmi";

// export const useSendMessage = (options?: any) => {
// 	const { address } = useAccount();

// 	return useMutation({
// 		mutationFn: async (messages: Message[]) => {
// 			const { data } = await axios.post(
// 				`${process.env.NEXT_PUBLIC_CHAT_API}/chat`,
// 				{ messages },
// 				{
// 					headers: {
// 						"x-address_signature": `${address}.${localStorage.getItem(
// 							"signature"
// 						)}`,
// 					},
// 				}
// 			);
// 			return data as any;
// 		},
// 		...options,
// 	});
// };

// export const useSendFnResponse = () => {
// 	const { address } = useAccount();

// 	return useMutation({
// 		mutationFn: async ({
// 			fnName,
// 			fnRes,
// 		}: {
// 			fnName: string;
// 			fnRes: any;
// 		}) => {
// 			const { data } = await axios.post(
// 				`${process.env.NEXT_PUBLIC_CHAT_API}/chat/fn-res`,
// 				{ fnName, fnRes },
// 				{
// 					headers: {
// 						"x-address_signature": `${address}.${localStorage.getItem(
// 							"signature"
// 						)}`,
// 					},
// 				}
// 			);
// 			return data as any;
// 		},
// 	});
// };
