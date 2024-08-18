import { create } from "zustand";
import { User } from "@/interfaces/user";

interface UserState {
  user: User | null;
  setUser: (user: any) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: any) => set(user),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
