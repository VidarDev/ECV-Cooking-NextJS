import { create } from 'zustand'

import { PageTransitionStore } from '@/types/stores'

const usePageTransitionStore = create<PageTransitionStore>((set) => ({
  isTransitionActive: false,
  isFirstLoad: true,
  setIsTransitionActive: (isTransitionActive: boolean) =>
    set({ isTransitionActive }),
  setIsFirstLoad: (isFirstLoad: boolean) => set({ isFirstLoad }),
}))

export default usePageTransitionStore
