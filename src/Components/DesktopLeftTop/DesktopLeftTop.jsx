import React, { useState, useEffect } from "react";
import "./DesktopLeftTop.css";

function DesktopLeftTop() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_85216b04c15ab86fa40b413472e8e68aad1a5&q=news&country=in&language=en&category=entertainment,politics,science,technology"
        );
        const data = await response.json();

        // Map API response to match existing article structure
        const formattedArticles = data.results.map((item, index) => {
          // Prioritize the specific article if matched
          const isTargetArticle =
            item.title === "Anupama 6th May 2025 Written Update: Raghav screams at Vasundhara" &&
            item.source_id?.toLowerCase().includes("justshowbiz");

          return {
            id: index + 1,
            title: isTargetArticle
              ? "Anupama 6th May 2025 Written Update: Raghav screams at Vasundhara"
              : item.title || "Untitled Article",
            author: isTargetArticle
              ? "JustShowBiz: " + (item.description?.slice(0, 100) + "..." || "No description available")
              : item.description?.slice(0, 100) + "..." || "No description available"
          };
        });

        // Ensure the target article is at the top if found
        const sortedArticles = formattedArticles.sort((a, b) =>
          a.title === "Anupama 6th May 2025 Written Update: Raghav screams at Vasundhara" ? -1 : 1
        );

        setArticles(sortedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Fallback data including the specific article
        setArticles([
          {
            id: 1,
            title: "Anupama 6th May 2025 Written Update: Raghav screams at Vasundhara",
            author: "JustShowBiz: Unable to fetch full details at this time..."
          },
          {
            id: 2,
            title: "Fallback News",
            author: "Unable to fetch news at this time..."
          }
        ]);
      }
    };

    fetchArticles();
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, articles.length));
  };

  return (
    <div className="leftsectiontop-1">
      <h3 className="leftsectiontop-1-heading">Trends</h3>
      <div className="leftsectiontop-1-container">
        <div className="leftsectiontop-1-scroll">
          {articles.slice(0, visibleCount).map((article) => (
            <div key={article.id} className="leftsectiontop-1-article">
              <span
                className="leftsectiontop-1-arrow"
                style={{
                  display: "inline-block",
  width: "50px",
  height: "50px",
  lineHeight: "40px",
  textAlign: "center",
  fontSize: "50px",
  marginRight: "10px",
  border: "1px solid black", // <-- Add this line
    borderRadius: "10px"
                }}
              >
                ➔
              </span>
              <div className="leftsectiontop-1-details">
                <p className="leftsectiontop-1-title">{article.title}</p>
                <p className="leftsectiontop-1-author">{article.author}</p>
              </div>
            </div>
          ))}
          {visibleCount < articles.length && (
            <button
              className="see-more-button"
              onClick={handleSeeMore}
              style={{
                display: "block",
                margin: "20px auto",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              See More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DesktopLeftTop;