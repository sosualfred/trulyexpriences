import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Article } from "../../api/headlines";

interface SearchState {
  articles: Article[];
}

const initialState: SearchState = {
  articles: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
  },
});

export const { setSearchArticles } = searchSlice.actions;

export const selectSearchArticles = (state: RootState) => state.search.articles;

export default searchSlice.reducer;
