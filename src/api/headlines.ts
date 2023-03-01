import { axiosGet } from "./axios";

export type Article = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string | null;
};

type ArticleResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};

type HeadlineQuery = {
  country?: string;
  page?: number;
};

export const fetchHeadlines = async ({
  country = "us",
  page = 1,
}: HeadlineQuery) => {
  const response = await axiosGet(`/top-headlines`, {
    params: {
      country,
      page,
    },
  });

  return response.data as ArticleResponse;
};
