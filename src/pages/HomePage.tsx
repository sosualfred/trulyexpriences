import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchHeadlines } from "../api/headlines";
import ArticleCard from "../components/ArticleCard";
import AppLayout from "../components/layouts/AppLayout";
import { setHeadlines } from "../redux/features/headlineSlice";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const headlines = useAppSelector((state) => state.headline.headlines);

  const { refetch, isFetching } = useQuery({
    queryKey: ["headlines", page],
    queryFn: () =>
      fetchHeadlines({
        page: page,
      }),
  });

  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    fetchInitialHeadlines();
  }, []);

  const fetchInitialHeadlines = async () => {
    if (page === 1) {
      const { data } = await refetch();
      if (data) {
        dispatch(setHeadlines(data.articles));
      }
    }
  };

  const fetchMoreHeadlines = async () => {
    let currentPage = page;
    setPage((prevPage) => prevPage + 1);
    const { data } = await refetch();
    if (data) {
      dispatch(setHeadlines([...headlines, ...data.articles]));
      if (data.articles.length === 0) {
        setCanLoadMore(false);
        setPage(currentPage);
      }
    }
  };

  return (
    <AppLayout>
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1">
        {headlines.map((article, idx) => (
          <ArticleCard key={idx} article={article} />
        ))}
      </div>

      <div className="py-10 flex items-center justify-center">
        {canLoadMore ? (
          <button
            className={`${
              isFetching ? "bg-orange-100" : "bg-orange-300"
            } text-xl rounded-md px-6 py-2 flex items-center justify-center`}
            onClick={fetchMoreHeadlines}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load more"}
          </button>
        ) : (
          <div>No more headlines</div>
        )}
      </div>
    </AppLayout>
  );
}
