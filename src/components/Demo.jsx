import React, { useState, useEffect } from "react";
import copy from "../assets/copy.svg";
import LinkIcon from "../assets/link.svg";
import Loader from "../assets/loader.svg";
import Tick from "../assets/tick.svg";
import { useLazyGetSummaryQuery } from "../Services/article";
function Demo() {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  // RTK Lazy Query
  const [getSummary, { isLoading, isError }] = useLazyGetSummaryQuery();

  // get articles from local storage and load the data
  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem("articles"));
    if (articles) setAllArticles(articles);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    console.log(data);

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [...allArticles, newArticle];

      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedArticles);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <section className="mt-6 w-full max-w-xl">
      {/* search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={LinkIcon}
            alt="link"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.reverse().map((item, index) => (
            <div
              key={index}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div
                className="copy_btn"
                onClick={(e) => {
                  handleCopy(item.url);
                }}
              >
                <img
                  src={copied === item.url ? Tick : copy}
                  about="copy"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>

              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* summary */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isLoading ? (
          <img src={Loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : isError ? (
          <p className="text-red-500">Something went wrong</p>
        ) : (
          article.summary && (
            <div className="summary_box">
              <p className="text-gray-700 font-satoshi text-sm">
                {article.summary}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default Demo;
