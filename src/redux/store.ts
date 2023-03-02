import { configureStore } from "@reduxjs/toolkit";
import { headlineSlice } from "./features/headlineSlice";

export const store = configureStore({
  reducer: {
    headline: headlineSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
