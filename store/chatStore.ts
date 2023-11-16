import { ChatMessage } from "@/lib/chat";
import { create } from "zustand";

//type for chat store

export type ChatStore = {
	messages: ChatMessage[];
	loading: boolean;
	openChat: boolean;
	setOpenChat: (value: boolean) => void;
	setMessages: (newMessages: ChatMessage[]) => void;
	addMessage: (newMessage: ChatMessage) => void;
	setLoading: (value: boolean) => void;
};

export const useChatStore = create((set) => ({
	messages: [],
	loading: false,
	openChat: false,
	setOpenChat: (value: boolean) => set(() => ({ openChat: value })),
	setMessages: (newMessages: any) =>
		set(() => ({
			messages: newMessages,
		})),
	addMessage: (newMessage: string) =>
		set((state: any) => ({
			messages: [...state.messages, newMessage],
		})),
	setLoading: (value: boolean) => set(() => ({ loading: value })),
}));
