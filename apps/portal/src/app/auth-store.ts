import { create } from "zustand";

import { GetAuthenticatedUserResponse } from "@repo/validators";

interface AuthStore {
  isAuthenticated: boolean;
  loading: boolean;
  user: GetAuthenticatedUserResponse | null;

  actions: {
    loadUser(user: GetAuthenticatedUserResponse): void;
    authenticate(access_token: string): void;
    clear(): void;
  };
}

const defaultState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

export const authStore = create<AuthStore>((set) => ({
  ...defaultState,

  actions: {
    loadUser: (user) => {
      set({ user, isAuthenticated: true, loading: false });
    },
    authenticate: (access_token) => {
      localStorage.setItem("token", access_token);
      set({ isAuthenticated: true, loading: false });
    },
    clear: () => {
      localStorage.removeItem("token");
      set({ ...defaultState, loading: false });
    },
  },
}));
