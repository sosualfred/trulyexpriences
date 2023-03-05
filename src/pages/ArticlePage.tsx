import { useHistory, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useAppSelector } from "../redux/redux-hooks";

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();

  const headlines = useAppSelector((state) => state.headline.headlines);

  const article = headlines[Number(id)];

  if (!article) {
    push("/");
    return null;
  }

  return (
    <AppLayout>
      <div className="max-w-6xl px-10 py-6 mx-auto">
        <a
          href="#_"
          className="block transition duration-200 ease-out transform"
        >
          <img
            className="object-cover w-full shadow-sm h-full"
            src={article.urlToImage || "https://picsum.photos/200"}
          />
        </a>

        {/* Date Published */}
        {article.publishedAt && (
          <div className="flex justify-between items-center mt-4">
            <span className="font-light text-gray-600">
              {new Date(article.publishedAt).toDateString()}
            </span>
          </div>
        )}

        <div className="mt-2">
          <a
            href={article.url}
            target="_blank"
            className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-purple-500  hover:underline"
          >
            {article.title}
          </a>

          <h1 className="font-bold text-gray-700 mt-2">
            Source <span className="text-gray-500">{article.source.name}</span>
          </h1>

          <h1 className="font-bold text-gray-700 mt-2">
            By{" "}
            <span className="text-gray-500">{article.author || "Unknown"}</span>
          </h1>
        </div>

        <div className="max-w-4xl px-10  mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
          <div>
            <p className="mt-2 p-8">{article.description}</p>
          </div>
        </div>

        <div className="mx-auto text-gray-700 mt-4 rounded bg-gray-100">
          <div>
            <p className="mt-2 p-8">{article.content}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
