import create from 'zustand';

interface UserStore {
  aiCount: number;
  decrementAICount: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  aiCount: 100,
  decrementAICount: () => set((state) => ({ aiCount: state.aiCount - 1 })),
}));