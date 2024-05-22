import { TokenResponse } from '@app/modules/auth/types.ts';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { StateCreator } from 'zustand/vanilla';

type State = {
    userInfo: TokenResponse | null;
};

type Actions = {
    logout: () => void;
    login: (userInfo: TokenResponse) => void;
    isLoggedIn: () => boolean;
};

type Store = State & Actions;

const initialState: State = {
    userInfo: null,
};

const stateCreator: StateCreator<Store> = (set, get) => ({
    ...initialState,
    logout: () => set(initialState),
    login: (userInfo: TokenResponse) => set({ userInfo }),
    isLoggedIn: () => !!get().userInfo,
});

const persisted = persist(stateCreator, {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
});

export const useAuthStore = create<Store>()(persisted);
