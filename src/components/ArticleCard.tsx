import { Link } from "react-router-dom";
import { Article } from "../api/headlines";
import { slugify } from "../utils/slugify";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
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
        <Link to={`/article/${slugify(article.title)}`}>
          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Read more
          </button>
        </Link>
      </div>
    </div>
  );
}
