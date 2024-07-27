import { create } from 'zustand';
import axios from 'axios';

interface UserStore {
    aiCount: number;
    decrementAICount: () => void;
    updateAICountOnServer: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    aiCount: 100,
    decrementAICount: () => set((state) => ({ aiCount: state.aiCount - 1 })),
    updateAICountOnServer: async () => {
        try {
            await axios.post('/api/updateAICount');
        } catch (error) {
            console.error('Error updating AI count on server:', error);
        }
    },
}));
