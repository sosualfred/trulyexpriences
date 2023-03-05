import { useHistory, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/redux-hooks";

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
    <div className="container mx-auto h-screen">
      {/* Artilce Image, Title, Description, and Iframe to show link */}
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
      <iframe src={article.url} title={article.title}></iframe>
    </div>
  );
}
