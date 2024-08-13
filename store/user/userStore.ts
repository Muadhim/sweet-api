import { create } from "zustand";

const useUserStore = create((set) => ({
	user: {} as any,
	setUser: (user: any) => set(user),
	clearUser: () => set({ user: null }),
}));

export default useUserStore;
