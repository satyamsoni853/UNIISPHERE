import React, { useState, useEffect, useRef } from "react";
import "./DesktopLeftTop.css";
import DesktopLeft2image1 from "./DesktopLeft2image1.png";
import DesktopLeft2image2 from "./DesktopLeft2image2.png";

function DesktopLeftTop() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchedArticles = [
      { id: 1, image: DesktopLeft2image1, title: "Students Association Union...", author: "As per the rumors it is said that the elections of this year is going that the elections of this year is going see more..." },
      { id: 2, image: DesktopLeft2image2, title: "Technology Innovations", author: "Latest advancements in AI and tech are taking the world by storm..." },
      { id: 3, image: DesktopLeft2image2, title: "Sports Updates", author: "The championship final is set to take place this weekend..." },
      { id: 4, image: DesktopLeft2image2, title: "Health & Lifestyle", author: "Experts suggest a balanced diet for a healthier life..." },
      { id: 5, image: DesktopLeft2image2, title: "Environmental Concerns", author: "Climate change effects are becoming more evident..." },
      { id: 6, image: DesktopLeft2image1, title: "Stock Market Trends", author: "Investors are keeping a close eye on the fluctuating markets... " },
      { id: 7, image: DesktopLeft2image2, title: "Entertainment Buzz", author: "New movie releases and celebrity gossip are trending..." },
      { id: 8, image: DesktopLeft2image1, title: "Educational Reforms", author: "Governments are focusing on improving the education system..." },
      { id: 9, image: DesktopLeft2image2, title: "Space Exploration", author: "NASA's new mission to Mars is set to launch soon..." },
      { id: 10, image: DesktopLeft2image1, title: "Global Politics", author: "World leaders discuss climate policies at the UN summit..." }
    ];
    setArticles(fetchedArticles);
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
    <div className="leftsectiontop-1"  >
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
