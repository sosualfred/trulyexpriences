import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchEverything, SortType } from "../api/search";
import ArticleCard from "../components/ArticleCard";
import AppLayout from "../components/layouts/AppLayout";
import {
  selectSearchArticles,
  setSearchArticles,
} from "../redux/features/searchSlice";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks";

export default function SearchPage() {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortType>("publishedAt");
  const searchArticles = useAppSelector(selectSearchArticles);

  const { searchTerm } = useParams<{ searchTerm: string }>();

  const { refetch, isFetching } = useQuery({
    queryKey: ["search", searchTerm, page],
    queryFn: () =>
      searchEverything({
        page: page,
        q: searchTerm,
        sortBy: sortBy,
      }),
    enabled: false,
    onSuccess(data) {
      let currentPage = page;
      setPage((prevPage) => prevPage + 1);
      if (data.articles.length === 0) {
        setCanLoadMore(false);
        setPage(currentPage);
      }
      if (page === 1) {
        dispatch(setSearchArticles(data.articles));
      } else {
        dispatch(setSearchArticles([...searchArticles, ...data.articles]));
      }
    },
  });

  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    setPage(1);
    refetch();
  }, [searchTerm, sortBy]);

  return (
    <AppLayout>
      <div className="text-3xl text-center py-10">
        Search results for: <b>{searchTerm}</b>
      </div>

      <div className="flex justify-center mb-10">
        <select
          className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortType)}
        >
          <option value="publishedAt">Published At</option>
          <option value="popularity">Popularity</option>
          <option value="relevancy">Relevancy</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1">
        {searchArticles.map((article, idx) => (
          <ArticleCard key={idx} article={article} />
        ))}
      </div>

      <div className="py-10 flex items-center justify-center">
        {canLoadMore ? (
          <button
            className={`${
              isFetching ? "bg-orange-100" : "bg-orange-300"
            } text-xl rounded-md px-6 py-2 flex items-center justify-center`}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load more"}
          </button>
        ) : (
          <div>No more articles</div>
        )}
      </div>
    </AppLayout>
  );
}
