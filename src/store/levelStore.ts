import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LevelStore = {
    level: string
    setLevel: (level: string) => void
}

export const useLevelStore = create<LevelStore>()(persist((set) => ({
    level: '',
    setLevel: (level: string) => set({ level }),
}), { name: "level-store" }))