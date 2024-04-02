import { create } from "zustand";

interface ILoginStore {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const useLoginStore = create<ILoginStore>((set) => ({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {
    set({ loggedIn });
  },
}));

export default useLoginStore;
