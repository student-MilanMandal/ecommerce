import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import cartReducer, { type CartState } from './cartSlice';
import themeReducer, { type ThemeState } from './themeSlice';

interface StoreState {
  cart: CartState;
  theme: ThemeState;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
  },
});

export type RootState = StoreState;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for TypeScript
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
