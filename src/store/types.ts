import { StateCreator } from "zustand";

export type StoreSlice<T> = StateCreator<T>;

// Common state for all slices that need loading and error handling
export interface BaseState {
  isLoading: boolean;
  error: string | null;
}

// Helper type for actions that handle loading states
export type WithLoadingState<T> = T & BaseState;
