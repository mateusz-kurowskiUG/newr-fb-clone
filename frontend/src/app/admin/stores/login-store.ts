import { create } from "zustand";

interface ILoginStore {
  loggedIn: boolean;
  // eslint-disable-next-line no-unused-vars
  setLoggedIn: (loggedIn: boolean) => void;
}

const useLoginStore = create<ILoginStore>((set) => ({
  loggedIn: false,
  toLogout: false,
  setLoggedIn: (loggedIn: boolean) => {
    set({ loggedIn });
  },
}));

export default useLoginStore;
