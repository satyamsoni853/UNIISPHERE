import React, { useState, useEffect, useRef } from "react";
import "./DesktopLeftTop.css";
import DesktopLeft2image1 from "./DesktopLeft2image1.png";
import DesktopLeft2image2 from "./DesktopLeft2image2.png";

function DesktopLeftTop() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_85216b04c15ab86fa40b413472e8e68aad1a5&q=news&country=in&language=en&category=entertainment,politics,science,technology"
        );
        const data = await response.json();
        
        // Map API response to match existing article structure
        const formattedArticles = data.results.map((item, index) => ({
          id: index + 1,
          image: index % 2 === 0 ? DesktopLeft2image1 : DesktopLeft2image2, // Alternate between images
          title: item.title || "Untitled Article",
          author: item.description?.slice(0, 100) + "..." || "No description available"
        }));
        
        setArticles(formattedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Fallback data in case of API failure
        setArticles([
          {
            id: 1,
            image: DesktopLeft2image1,
            title: "Fallback News",
            author: "Unable to fetch news at this time..."
          }
        ]);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prevCount) => Math.min(prevCount + 3, articles.length));
      }
    });

    const target = document.querySelector(".scroll-trigger");
    if (target) observerRef.current.observe(target);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [articles]);

  return (
    <div className="leftsectiontop-1">
      <h3 className="leftsectiontop-1-heading">Trends</h3>
      <div className="leftsectiontop-1-container">
        <div className="leftsectiontop-1-scroll">
          {articles.slice(0, visibleCount).map((article) => (
            <div key={article.id} className="leftsectiontop-1-article">
              <img
                src={article.image}
                alt={article.title}
                className="leftsectiontop-1-image"
              />
              <div className="leftsectiontop-1-details">
                <p className="leftsectiontop-1-title">{article.title}</p>
                <p className="leftsectiontop-1-author">{article.author}</p>
              </div>
            </div>
          ))}
          {visibleCount < articles.length && <div className="scroll-trigger"></div>}
        </div>
      </div>
    </div>
  );
}

export default DesktopLeftTop;