import { axiosGet } from "./axios";
import { ArticleResponse } from "./headlines";

export type SortType = "publishedAt" | "popularity" | "relevancy";

type SearchQuery = {
  page?: number;
  sortBy?: SortType;
  q: string;
  pageSize?: number;
};

export const searchEverything = async ({
  page = 1,
  sortBy = "publishedAt",
  q,
  pageSize = 20,
}: SearchQuery) => {
  const response = await axiosGet(`/everything`, {
    params: {
      page,
      sortBy,
      q,
      pageSize,
    },
  });

  return response.data as ArticleResponse;
};
