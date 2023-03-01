import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Article, fetchHeadlines } from "../../api/headlines";

export default function HomePage() {
  const [page, setPage] = useState(1);

  const {
    data: articlesResponse,
    error,
    isLoading,
    isSuccess,
    isPreviousData,
  } = useQuery({
    queryKey: ["headlines", { page }],
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    queryFn: () =>
      fetchHeadlines({
        page: page,
      }),
  });

  const [headlines, setHeadlines] = useState<Article[]>([]);
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      if (!isPreviousData) {
        setHeadlines((prev) => [...prev, ...articlesResponse.articles]);
      }
      if (articlesResponse.articles.length === 0) {
        setCanLoadMore(false);
      }
    }
  }, [articlesResponse, isSuccess, page]);

  const fetchMoreHeadlines = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      HomePage
      {isSuccess && (
        <ol>
          {headlines.map((article, idx) => (
            <li key={article.url}>{`${idx + 1}. ${article.title}`}</li>
          ))}
        </ol>
      )}
      {error && <div>Error</div>}
      {canLoadMore ? (
        <button
          className="h-6 bg-orange-200 rounded-md p-2 flex items-center justify-center"
          onClick={fetchMoreHeadlines}
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      ) : (
        <div>No more headlines</div>
      )}
    </>
  );
}
