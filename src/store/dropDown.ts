import { create } from 'zustand'

type DropDownStore = {
    dropDown: boolean
    setDropDown: (dropDown: boolean) => void
}

export const useDropDownStore = create<DropDownStore>()((set) => ({
    dropDown: false,
    setDropDown: (dropDown: boolean) => set({ dropDown }),
}))