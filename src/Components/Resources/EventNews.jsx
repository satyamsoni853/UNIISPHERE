import React, { useState } from "react";
import "./EventNews.css";
import EventNewsImage from "./EventNewsImage.png";
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDropleftCircle } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import TrendImage from './trend.png'

const EventNews = () => {
  const [leftRightSwitch, setLeftRightSwitch] = useState(true);

  const eventNewsItemsList = [
    {
      title: "The University is going to have Event",
      description:
        "eiufbiwlebfjdbfrhbr. iwehfpieufblsbfhrfbrygbhjbhbdbfryfgqieuhfuidslk. aiuhugqyukbvshvbdhbruybsa. piauhruyhgrytyqpuirgbhblfbjd,f. ailsdvhhrbtuyejbvhlshbvhjbhbyre.eiufbiwlebfjdbfrhbr.iwehfpieufblsbfhrfbry gbhjbhbdbfryfgqieuhfuidslk.whdbjheaiuhugqyukbvshvbdhbruybsa. ",
      image_url: EventNewsImage,
    },
    {
      title: "Good News for the upcoming batch",
      description:
        "eiufbiwlebfjdbfrhbr. iwehfpieufblsbfhrfbrygbhjbhbdbfryfgqieuhfuidslk. aiuhugqyukbvshvbdhbruybsa. piauhruyhgrytyqpuirgbhblfbjd,f. ailsdvhhrbtuyejbvhlshbvhjbhbyre.eiufbiwlebfjdbfrhbr.iwehfpieufblsbfhrfbry gbhjbhbdbfryfgqieuhfuidslk.whdbjheaiuhugqyukbvshvbdhbruybsa.  ",
      image_url: EventNewsImage,
    },
    {
      title: "Students graduated from the Universities",
      description:
        "eiufbiwlebfjdbfrhbr. iwehfpieufblsbfhrfbrygbhjbhbdbfryfgqieuhfuidslk. aiuhugqyukbvshvbdhbruybsa. piauhruyhgrytyqpuirgbhblfbjd,f. ailsdvhhrbtuyejbvhlshbvhjbhbyre.eiufbiwlebfjdbfrhbr.iwehfpieufblsbfhrfbry gbhjbhbdbfryfgqieuhfuidslk.whdbjheaiuhugqyukbvshvbdhbruybsa.  ",
      image_url: EventNewsImage,
    },
    {
      title: "Various profits of the NEPS for the students",
      description:
        "eiufbiwlebfjdbfrhbr. iwehfpieufblsbfhrfbrygbhjbhbdbfryfgqieuhfuidslk. aiuhugqyukbvshvbdhbruybsa. piauhruyhgrytyqpuirgbhblfbjd,f. ailsdvhhrbtuyejbvhlshbvhjbhbyre.eiufbiwlebfjdbfrhbr.iwehfpieufblsbfhrfbry gbhjbhbdbfryfgqieuhfuidslk.whdbjheaiuhugqyukbvshvbdhbruybsa.  ",
      image_url: EventNewsImage,
    },
    {
      title: "Various profits of the NEPS for the students",
      description:
        "eiufbiwlebfjdbfrhbr. iwehfpieufblsbfhrfbrygbhjbhbdbfryfgqieuhfuidslk. aiuhugqyukbvshvbdhbruybsa. piauhruyhgrytyqpuirgbhblfbjd,f. ailsdvhhrbtuyejbvhlshbvhjbhbyre.eiufbiwlebfjdbfrhbr.iwehfpieufblsbfhrfbry gbhjbhbdbfryfgqieuhfuidslk.whdbjheaiuhugqyukbvshvbdhbruybsa.  ",
      image_url: EventNewsImage,
    },
    {
      title: "Various profits of the NEPS for the students",
      description:
        "eiufbiwlebfjdbfrhbr. iwehfpieufblsbfhrfbrygbhjbhbdbfryfgqieuhfuidslk. aiuhugqyukbvshvbdhbruybsa. piauhruyhgrytyqpuirgbhblfbjd,f. ailsdvhhrbtuyejbvhlshbvhjbhbyre.eiufbiwlebfjdbfrhbr.iwehfpieufblsbfhrfbry gbhjbhbdbfryfgqieuhfuidslk.whdbjheaiuhugqyukbvshvbdhbruybsa.  ",
      image_url: EventNewsImage,
    },
  ];

  return (
    <>
    <div className="event-news-main-container">
      <h1 className="event-news-main-container-main-title">
        All you need at one place to be successful in your Student Life.
      </h1>
      <div className="event-news-items-list">
        {eventNewsItemsList.map((even, index) => {
          const isEven = index % 2 === 0;
         
          return (
            <div key={index} className="event-news-item">
              <h2>{even.title}</h2>
              <div
              style={{
                flexDirection:isEven ? 'row' :'row-reverse'
              }}
              className={`event-item-image-and-description`}>
                <p className="event-item-description-title">{even.description}</p>
                <img src={even.image_url} alt="" />
                {isEven && (
                  <IoIosArrowForward className="event-news-forward-arrow" />
                )}
                {!isEven && (
                  <IoIosArrowBack className="event-news-back-arrow" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>

    <div className="mobile-event-news-main-container">
      <div className="mobile-event-main-heading">
        <IoArrowBackCircleOutline className="mobile-event-news-backIcon"/>
      <h1 className="mobile-event-news-main-container-main-title">
      Caught all the latest Trends, News and reports
      </h1>
      </div>
      <div className="mobile-event-news-items-list">
        {eventNewsItemsList.map((even, index) => {
          const isEven = index % 2 === 0;
         
          return (
            <div key={index} className="mobile-event-news-item">
              <h2 className="mobile-event-news-heading">{even.title}</h2>
              <div
              style={{
                flexDirection:isEven ? 'row' :'row-reverse'
              }}
              className={`mobile-event-item-image-and-description`}>
                <p className="mobile-event-item-description-title">{even.description}</p>
                <img src={TrendImage} alt="" />
                
              </div>
            </div>
          )
        })}
      </div>
    </div>
    </>
  );
};

export default EventNews;
