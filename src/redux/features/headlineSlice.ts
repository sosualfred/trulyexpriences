import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Article } from "../../api/headlines";

interface HeadlineState {
  headlines: Article[];
}

const initialState: HeadlineState = {
  headlines: [],
};

export const headlineSlice = createSlice({
  name: "headline",
  initialState,
  reducers: {
    updateHeadlines: (state, action: PayloadAction<Article[]>) => {
      state.headlines = action.payload;
    },
  },
});

export const { updateHeadlines } = headlineSlice.actions;

export const selectHeadlines = (state: RootState) => state.headline.headlines;

export default headlineSlice.reducer;
