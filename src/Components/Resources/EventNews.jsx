import React, { useState } from "react";
import "./EventNews.css";
import EventNewsImage from "./EventNewsImage.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import TrendImage from "./trend.png";

const EventNews = () => {
  const [selectedNews, setSelectedNews] = useState(null); // State to track the selected news item

  const eventNewsItemsList = [
    {
      title: "The University is going to have Event",
      description:
        "eiufbiwlebfjdbfrhbr. iwehfpieufblsbfhrfbrygbhjbhbdbfryfgqieuhfuidslk. aiuhugqyukbvshvbdhbruybsa. piauhruyhgrytyqpuirgbhblfbjd,f. ailsdvhhrbtuyejbvhlshbvhjbhbyre.eiufbiwlebfjdbfrhbr.iwehfpieufblsbfhrfbry gbhjbhbdbfryfgqieuhfuidslk.whdbjheaiuhugqyukbvshvbdhbruybsa. " +
        "The event will feature a variety of activities for students and faculty. " +
        "Workshops on career development and skill-building will be held throughout the day. " +
        "Guest speakers from leading industries will share their insights and experiences. " +
        "A panel discussion on the future of education is scheduled for the afternoon. " +
        "Students will have the opportunity to network with professionals and alumni. " +
        "The event will also include a cultural showcase with performances by student groups. " +
        "Food stalls offering a range of cuisines will be available for attendees. " +
        "A special session on mental health awareness will be conducted by experts. " +
        "The university has arranged transportation for off-campus participants. " +
        "Prizes will be awarded to winners of various competitions held during the event. " +
        "Volunteers are needed to help with event coordination and management. " +
        "Registration for the event is now open on the university website.",
      image_url: EventNewsImage,
    },
    {
      title: "Good News for the upcoming batch",
      description:
        "eiufbiwlebfjdbfrhbr. iwehfpieufblsbfhrfbrygbhjbhbdbfryfgqieuhfuidslk. aiuhugqyukbvshvbdhbruybsa. piauhruyhgrytyqpuirgbhblfbjd,f. ailsdvhhrbtuyejbvhlshbvhjbhbyre.eiufbiwlebfjdbfrhbr.iwehfpieufblsbfhrfbry gbhjbhbdbfryfgqieuhfuidslk.whdbjheaiuhugqyukbvshvbdhbruybsa. " +
        "The upcoming batch will benefit from a newly introduced scholarship program. " +
        "This program aims to support students from diverse backgrounds financially. " +
        "Additional courses on emerging technologies have been added to the curriculum. " +
        "The university has partnered with top companies for internship opportunities. " +
        "A mentorship program will connect students with experienced faculty members. " +
        "Newly renovated dormitories will be available for the incoming students. " +
        "The library has expanded its digital resources for better access to research. " +
        "Sports facilities have been upgraded to encourage student participation. " +
        "A welcome orientation will be held to help students settle into campus life. " +
        "The batch will also have access to exclusive workshops on leadership skills. " +
        "Career counseling services will be provided throughout their academic journey. " +
        "The university is committed to ensuring a holistic learning experience.",
      image_url: EventNewsImage,
    },
    {
      title: "Students graduated from the Universities",
      description:
        "eiufbiwlebfjdbfrhbr. iwehfpieufblsbfhrfbrygbhjbhbdbfryfgqieuhfuidslk. aiuhugqyukbvshvbdhbruybsa. piauhruyhgrytyqpuirgbhblfbjd,f. ailsdvhhrbtuyejbvhlshbvhjbhbyre.eiufbiwlebfjdbfrhbr.iwehfpieufblsbfhrfbry gbhjbhbdbfryfgqieuhfuidslk.whdbjheaiuhugqyukbvshvbdhbruybsa. " +
        "This year’s graduation ceremony was held with great enthusiasm on campus. " +
        "Over 500 students received their degrees across various disciplines. " +
        "The event was graced by a renowned scientist as the chief guest. " +
        "Several students were honored with awards for academic excellence. " +
        "The valedictorian speech highlighted the importance of lifelong learning. " +
        "Families and friends gathered to celebrate the graduates’ achievements. " +
        "A photo session was organized to capture the memorable moments. " +
        "The university president addressed the students, wishing them success. " +
        "Graduates were encouraged to stay connected through the alumni network. " +
        "A farewell dinner was hosted for the graduating class in the evening. " +
        "The event concluded with a spectacular fireworks display on campus. " +
        "The university looks forward to seeing the graduates’ future accomplishments.",
      image_url: EventNewsImage,
    },
    {
      title: "Various profits of the NEPS for the students",
      description:
        "eiufbiwlebfjdbfrhbr. iwehfpieufblsbfhrfbrygbhjbhbdbfryfgqieuhfuidslk. aiuhugqyukbvshvbdhbruybsa. piauhruyhgrytyqpuirgbhblfbjd,f. ailsdvhhrbtuyejbvhlshbvhjbhbyre.eiufbiwlebfjdbfrhbr.iwehfpieufblsbfhrfbry gbhjbhbdbfryfgqieuhfuidslk.whdbjheaiuhugqyukbvshvbdhbruybsa. " +
        "The NEPS program offers students access to exclusive educational resources. " +
        "It provides financial aid to those who qualify for the program. " +
        "Students can attend specialized workshops on professional development. " +
        "The program includes free access to online learning platforms. " +
        "NEPS organizes networking events with industry leaders and experts. " +
        "Participants receive priority registration for high-demand courses. " +
        "A dedicated advisor is assigned to guide students through their journey. " +
        "The program also offers subsidies for attending international conferences. " +
        "Students can apply for research grants through the NEPS initiative. " +
        "Regular feedback sessions help improve the program’s offerings. " +
        "NEPS alumni have reported significant career advancements after participation. " +
        "The university encourages all eligible students to apply for NEPS benefits.",
      image_url: EventNewsImage,
    },
  ];

  // Sample related news items for the detailed view
  const relatedNews = [
    { title: "The Students in Ro...", link: "#" },
    { title: "Jobs for St...", link: "#" },
    { title: "Next Job Call for...", link: "#" },
    { title: "Students fro...", link: "#" },
  ];

  // Function to handle image click
  const handleImageClick = (news) => {
    setSelectedNews(news);
  };

  // Function to go back to the news list
  const handleBackClick = () => {
    setSelectedNews(null);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="event-news-main-container">
        <h1 className="event-news-main-container-main-title">
          All you need at one place to be successful in your Student Life.
        </h1>

        {/* Conditionally render either the list or the detailed view */}
        {!selectedNews ? (
          <div className="event-news-items-list">
            {eventNewsItemsList.map((even, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="event-news-item">
                  <h2>{even.title}</h2>
                  <div
                    style={{ 
                      flexDirection: isEven ? "row" :"row-reverse",
                    gap:isEven ? "0rem" :"1rem" }}
                    className="event-item-image-and-description"
                  >
                    <div className="event-item-description-title">
                      {even.description}
                    </div>
                    <img
                      src={even.image_url}
                      alt=""
                      onClick={() => handleImageClick(even)} // Click on image to show detailed view
                      style={{ cursor: "pointer" }}
                    />
                    {isEven && (
                      <IoIosArrowForward className="event-news-forward-arrow" />
                    )}
                    {!isEven && (
                      <IoIosArrowBack className="event-news-back-arrow" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="event-news-detail-view">
            <div className="detail-header">
              <IoArrowBackCircleOutline
                className="back-icon"
                onClick={handleBackClick}
                style={{ cursor: "pointer", fontSize: "2rem" }}
              />
              <h2>{selectedNews.title}</h2>
            </div>
            <div className="detail-content">
              <img
                src={selectedNews.image_url}
                alt=""
                className="detail-image"
              />
              <p>{selectedNews.description}</p>
            </div>
            <div className="related-news">
              <h3>Similar</h3>
              <div className="related-news-items">
                {relatedNews.map((item, index) => (
                  <a key={index} href={item.link} className="related-news-item">
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="mobile-event-news-main-container">
        <div className="mobile-event-main-heading">
          <IoArrowBackCircleOutline className="mobile-event-news-backIcon" />
          <h1 className="mobile-event-news-main-container-main-title">
            Caught all the latest Trends, News and reports
          </h1>
        </div>

        {/* Conditionally render either the list or the detailed view */}
        {!selectedNews ? (
          <div className="mobile-event-news-items-list">
            {eventNewsItemsList.map((even, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="mobile-event-news-item">
                  <h2 className="mobile-event-news-heading">{even.title}</h2>
                  <div
                    style={{ flexDirection: isEven ? "row" : "row-reverse" }}
                    className="mobile-event-item-image-and-description"
                  >
                    <p className="mobile-event-item-description-title">
                      {even.description}
                    </p>
                    <img
                      src={TrendImage}
                      alt=""
                      onClick={() => handleImageClick(even)} // Click on image to show detailed view
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mobile-event-news-detail-view">
            <div className="mobile-detail-header">
              <IoArrowBackCircleOutline
                className="mobile-back-icon"
                onClick={handleBackClick}
                style={{ cursor: "pointer", fontSize: "2rem" }}
              />
              <h2>{selectedNews.title}</h2>
            </div>
            <div className="mobile-detail-content">
              <img
                src={selectedNews.image_url}
                alt=""
                className="mobile-detail-image"
              />
              <p>{selectedNews.description}</p>
            </div>
            <div className="mobile-related-news">
              <h3>Similar</h3>
              <div className="mobile-related-news-items">
                {relatedNews.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="mobile-related-news-item"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventNews;
