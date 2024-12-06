export interface PageTransitionStore {
  isTransitionActive: boolean;
  setIsTransitionActive: (isTransitionActive: boolean) => void;
  isFirstLoad: boolean;
  setIsFirstLoad: (isFirstLoad: boolean) => void;
}
