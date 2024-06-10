// authStore.ts
import {create} from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  setAuth : (value : boolean) => void;
};

const useAuthStore = create<AuthState>((set) => {

  return {
    isAuthenticated: false,
    setAuth : (value : boolean ) => set({isAuthenticated : value}),
  };
});

export default useAuthStore;
