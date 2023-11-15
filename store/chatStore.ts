import { create } from "zustand";

export const useChatStore = create((set) => ({
	messages: [],
	loading: false,
	setMessages: (newMessages: any) =>
		set(() => ({
			messages: newMessages,
		})),
	addMessage: (newMessage: string) =>
		set((state: any) => ({
			messages: [...state.messages, newMessage],
		})),
	setLoading: (value: boolean) => set(() => ({ loading: value })),
	confirmData: null,
	setConfirmData: (data: any) =>
		set(() => ({
			confirmData: data,
		})),
}));
