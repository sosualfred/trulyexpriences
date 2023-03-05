import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Article } from "../api/headlines";
import { searchEverything } from "../api/search";
import AppLayout from "../components/AppLayout";
import { setHeadlines } from "../redux/features/headlineSlice";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks";

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const [page, setPage] = useState(1);
  const headlines = useAppSelector((state) => state.headline.headlines);

  const { searchTerm } = useParams<{ searchTerm: string }>();

  const { refetch, isFetching } = useQuery({
    queryKey: ["search", page],
    queryFn: () =>
      searchEverything({
        page: page,
        q: searchTerm,
      }),
  });

  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    fetchQueryItem();
  }, []);

  const fetchQueryItem = async () => {
    const { data } = await refetch();
    if (data) {
      dispatch(setHeadlines(data.articles));
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

  const handleHeadlineClicked = (idx: number) => {
    push(`/article/${idx}`);
  };

  return (
    <AppLayout>
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1">
        {headlines.map((article, idx) => (
          <div key={idx} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full h-60 object-cover"
              src={article.urlToImage || "https://picsum.photos/200"}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-gray-700 mb-2 text-ellipsis line-clamp-2">
                {article.title || "No title"}
              </div>
              <p className="text-gray-700 text-base text-ellipsis line-clamp-1">
                {article.description || "No description"}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button
                onClick={() => handleHeadlineClicked(idx)}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                Read more
              </button>
            </div>
          </div>
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
