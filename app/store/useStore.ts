import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type IdeaType = 'business' | 'college';
export type RoadmapStage = 'validate' | 'build' | 'launch' | 'scale';

export interface RoadmapTask {
  title: string;
  detail: string;
}

export interface RoadmapPhase {
  stage: RoadmapStage;
  title: string;
  timeline: string;
  goal: string;
  tasks: RoadmapTask[];
}

export interface Roadmap {
  id: string;
  idea: string;
  type: IdeaType;
  audience: string;
  createdAt: number;
  concept: string;
  problem: string;
  solution: string;
  customers: string[];
  revenue: string[];
  mvp: string[];
  metrics: string[];
  risks: string[];
  phases: RoadmapPhase[];
}

interface AppState {
  roadmaps: Roadmap[];
  activeRoadmapId: string | null;
  hasHydrated: boolean;
  addRoadmap: (roadmap: Roadmap) => void;
  deleteRoadmap: (id: string) => void;
  setActiveRoadmap: (id: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      roadmaps: [],
      activeRoadmapId: null,
      hasHydrated: false,
      addRoadmap: (roadmap) =>
        set((state) => ({
          roadmaps: [roadmap, ...state.roadmaps],
          activeRoadmapId: roadmap.id,
        })),
      deleteRoadmap: (id) =>
        set((state) => {
          const roadmaps = state.roadmaps.filter((roadmap) => roadmap.id !== id);
          const activeRoadmapId =
            state.activeRoadmapId === id
              ? (roadmaps[0]?.id ?? null)
              : state.activeRoadmapId;

          return { roadmaps, activeRoadmapId };
        }),
      setActiveRoadmap: (id) => set({ activeRoadmapId: id }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: 'ideovate-storage',
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as Partial<AppState>;

        return {
          roadmaps: state.roadmaps ?? [],
          activeRoadmapId: state.activeRoadmapId ?? state.roadmaps?.[0]?.id ?? null,
          hasHydrated: false,
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
