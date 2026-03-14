import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Idea {
  id: string;
  text: string;
  createdAt: number;
}

interface AppState {
  ideas: Idea[];
  addIdea: (text: string) => void;
  deleteIdea: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ideas: [],
      addIdea: (text) =>
        set((state) => ({
          ideas: [
            { id: crypto.randomUUID(), text, createdAt: Date.now() },
            ...state.ideas,
          ],
        })),
      deleteIdea: (id) =>
        set((state) => ({
          ideas: state.ideas.filter((idea) => idea.id !== id),
        })),
    }),
    {
      name: 'ideovate-storage',
    }
  )
);
