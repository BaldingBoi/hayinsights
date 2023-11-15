import { create } from "zustand";

export const useTabStore = create((set) => ({
	activeTab: "home",
	openPopup: false,
	setActiveTab: (tab: string) => set(() => ({ activeTab: tab })),
	setOpenPopup: (value: boolean) => set(() => ({ openPopup: value })),
}));
