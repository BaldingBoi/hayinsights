import { create } from "zustand";

export const useSimulationStore = create((set) => ({
	plan: null,
	setPlan: (data: any) => set(() => ({ plan: data })),
	useBot: false,
	setUseBot: (value: boolean) => set(() => ({ useBot: value })),
}));
