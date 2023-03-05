import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Article, fetchHeadlines } from "../../api/headlines";
import { setHeadlines } from "../../redux/features/headlineSlice";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

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

  const handleHeadlineClicked = (idx: number, article: Article) => {
    push(`/article/${idx}`);
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1">
        {headlines.map((article, idx) => (
          <div key={idx} className="max-w-sm rounded overflow-hidden shadow-lg">
            {idx + 1}
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
                onClick={() => handleHeadlineClicked(idx, article)}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>

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
