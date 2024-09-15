import { IGroup } from "@/interfaces/Group";
import { create } from "zustand";

type State = {
  groups: IGroup[];
  group: IGroup;
};

type Actions = {
  setGroups: (g: IGroup[]) => void;
  setGroup: (g: IGroup) => void;
  reset: () => void;
};

const initialState: State = {
  groups: [],
  group: {} as IGroup,
};

const useGroupStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setGroups: (g: IGroup[]) => {
    set({ groups: g });
  },
  setGroup: (g: IGroup) => {
    set({ group: g });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useGroupStore
