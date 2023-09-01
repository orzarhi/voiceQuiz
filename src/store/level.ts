import { LevelType } from '@/types/level'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LevelStore = {
    level: string
    setLevel: (level: LevelType) => void
}

export const useLevelStore = create<LevelStore>()(persist((set) => ({
    level: '',
    setLevel: (level: LevelType) => set({ level }),
}), { name: "level-store" }))