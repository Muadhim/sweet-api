import { User } from "next-auth";
import { create } from "zustand";

const useUserStore = create((set) => ({
	user: {} as User,
	setUser: (user: User) => set(user),
	clearUser: () => set({ user: null }),
}));

export default useUserStore;
