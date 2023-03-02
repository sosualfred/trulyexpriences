import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Article, fetchHeadlines } from "../../api/headlines";

export default function HomePage() {
  const [page, setPage] = useState(1);

  const {
    data: articlesResponse,
    isFetching,
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
    <div className="container mx-auto h-screen">
      {isSuccess && (
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1">
          {headlines.map((article, idx) => (
            <div
              key={idx}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img
                className="w-full max-h-60"
                src={article.urlToImage || "https://picsum.photos/200"}
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-gray-700 mb-2">
                  {article.title}
                </div>
                <p className="text-gray-700 text-base">{article.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <Link to={`/article/${article.title}`}>
                  <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {canLoadMore ? (
        <button
          className="h-6 bg-orange-200 rounded-md p-2 flex items-center justify-center"
          onClick={fetchMoreHeadlines}
        >
          {isFetching ? "Loading..." : "Load more"}
        </button>
      ) : (
        <div>No more headlines</div>
      )}
    </div>
  );
}
