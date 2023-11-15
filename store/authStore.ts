import { create } from "zustand";

export type AuthStore = {
	nonce: string | null;
	verified: boolean;
	setVerified: (value: boolean) => void;
	isOpenVerificationModal: boolean;
	setIsOpenVerificationModal: (value: boolean) => void;
};

export const useAuthStore = create((set) => ({
	nonce: null,
	verified: false,
	setVerified: (value: boolean) => set(() => ({ verified: value })),
	isOpenVerificationModal: false,
	setIsOpenVerificationModal: (value: boolean) =>
		set(() => ({ isOpenVerificationModal: value })),
}));
