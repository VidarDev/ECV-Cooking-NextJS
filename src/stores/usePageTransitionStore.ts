import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { PageTransitionStore } from '@/types/stores'

const usePageTransitionStore = create<PageTransitionStore>()(
  devtools(
    (set) => ({
      isTransitionActive: false,
      isFirstLoad: true,
      setIsTransitionActive: (isTransitionActive: boolean) =>
        set({ isTransitionActive }),
      setIsFirstLoad: (isFirstLoad: boolean) => set({ isFirstLoad }),
    }),
    {
      name: 'page-transition-store',
    },
  ),
)

export default usePageTransitionStore
