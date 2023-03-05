import { axiosGet } from "./axios";
import { ArticleResponse } from "./headlines";

type SearchQuery = {
  country?: string;
  page?: number;
  sortBy?: "publishedAt" | "popularity" | "relevancy";
  q: string;
};

export const searchEverything = async ({
  country = "us",
  page = 1,
  sortBy = "publishedAt",
  q,
}: SearchQuery) => {
  const response = await axiosGet(`/everything`, {
    params: {
      country,
      page,
      sortBy,
      q,
    },
  });

  return response.data as ArticleResponse;
};
