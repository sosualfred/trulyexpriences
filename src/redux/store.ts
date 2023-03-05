import { configureStore } from "@reduxjs/toolkit";
import { headlineSlice } from "./features/headlineSlice";
import { searchSlice } from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    headline: headlineSlice.reducer,
    search: searchSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
