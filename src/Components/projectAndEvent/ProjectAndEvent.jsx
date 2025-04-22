import React, { useState } from "react";
import "./ProjectAndEvent.css";
import profileImage from "./profilePhoto.png";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftBottom from "../DesktopLeftBottom/DesktopLeftBottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";

function ProjectAndEvent() {
  const [Collaborations, setCollaborations] = useState(true);

  const collaboratorsgradients = [
    "linear-gradient(to bottom,  #ddf3fb,  #faf1be)",
    "linear-gradient(to bottom, #fbdddd,#cecbf6)",
  ];

  const [projectName, setProjectName] = useState("Project Name");
  const [personName, setPersonName] = useState("Arjun Verma");
  const [personHeadline, setPersonHeadline] = useState(
    "Headline of the person"
  );
  const [description, setDescription] = useState(
    "Book and Meet with the experts in there which respective fields. To get the shortcuts of success Book and Meet with the experts in there which respective fields. To get the shortcuts of success Book and Meet with the experts in there which respective fields. To get the shortcuts of success respective fields. To get the shortcuts of success Book and Meet with the experts in there which shortcuts of succes"
  );

  const [details, setDetails] = useState([
    "Working with React JS.",
    "Already been working for the last 3 months.",
    "Also have UI/UX Designer.",
    "To be completed in the next 2 months.",
  ]);

  const [collaborators, setCollaborators] = useState([
    { name: "Karan Verma", info: "The RJVY NGO is set to month ...." },
    { name: "Yash Bansal", info: "The RJVY NGO is set to month ...." },
  ]);

  const [event, setEvent] = useState(false);

  const gradients = [
    "linear-gradient(to bottom,  #F7FFF5,  #ECF0FF)",
    "linear-gradient(to bottom, #FFF5F5,#ECFFFD)",
    "linear-gradient(to bottom, #FFFEF5, #EFECFF)",
    "linear-gradient(to bottom, #FFF5FD, #FFFEEC)",
  ];

  const [events, setEvents] = useState([
    {
      title: "COLLEGE FESTS",
      college: "Kirorimal College",
      date: "12-Apr-2025",
      description:
        "Book and Meet with the experts in there which respective fields. To get the shortcuts of success Book and Meet with the experts in there which …..",
      logo: profileImage,
    },
    {
      title: "FRESHERS PARTY",
      college: "Hindu College",
      date: "07-Jan-2025",
      description:
        "Book and Meet with the experts in there which respective fields. To get the shortcuts of success Book and Meet with the experts in there which …..",
      logo: profileImage,
    },
    {
      title: "FAREWELL PARTY",
      college: "Aryabhat College",
      date: "25-May-2025",
      description:
        "Book and Meet with the experts in there which respective fields. To get the shortcuts of success Book and Meet with the experts in there which …..",
      logo: profileImage,
    },
    {
      title: "DIWALI EVENT",
      college: "Ramjas College",
      date: "31-Oct-2025",
      description:
        "Book and Meet with the experts in there which respective fields. To get the shortcuts of success Book and Meet with the experts in there which …..",
      logo: profileImage,
    },
  ]);

  return (
    <div>
      <DesktopNavbarr />
      <div className="projectandevent-main-container-1">
        <Background />
        <div className="projectandevent-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottom />
        </div>
        <div className="projectandevent-main-container">
          <div className="projectandevent-project-card">
            <div className="projectandevent-header">
              <button
                onClick={() => {
                  setEvent(true);
                  setCollaborations(false);
                }}
                className="projectandevent-tab1"
              >
                Events
              </button>
              <button
                onClick={() => {
                  setCollaborations(true);
                  setEvent(false);
                }}
                className="projectandevent-tab2"
              >
                Collaboration
              </button>
            </div>

            {Collaborations && (
              <div className="projectandevent-down-container">
                <div className="projectandevent-content">
                  <img
                    src={profileImage}
                    alt={personName}
                    className="projectandevent-profile-pic"
                  />
                  <div>
                    <h2>{projectName}</h2>
                  </div>
                </div>

                <div className="projectandevent-headline-and-name">
                  <h2>{personName}</h2>
                  <p className="projectandevent-headline"> {personHeadline}</p>
                </div>

                <div className="projectandevent-description">
                  <h2>Description</h2>
                  <p> {description}</p>
                </div>

                <div className="projectandevent-project-details">
                  <h2>Project Details</h2>
                  <ul className="projectandevent-project-tech">
                    {details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>

                <div className="projectandevent-collaborators">
                  {collaborators.map((collab, index) => (
                    <div
                      key={index}
                      style={{
                        background:
                          collaboratorsgradients[index % gradients.length],
                      }}
                      className="projectandevent-collaborator"
                    >
                      <div className="projectandevent-collaborator-img">
                        <img src={profileImage} alt="" />
                      </div>
                      <div className="projectandevent-collabrator-details">
                        <h2 className="projectandevent-collaborator-name">
                          {collab.name}
                        </h2>
                        <p className="projectandevent-collaborator-para">
                          {collab.info}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="projectandevent-others">7+ others</div>
                </div>
                <ul></ul>
              </div>
            )}

            {event && (
              <div className="projectandevent-collaborations-container">
                <div className="projectandevent-events-page">
                  <div className="projectandevent-event-list">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        style={{
                          background: gradients[index % gradients.length],
                        }}
                        className="projectandevent-event-card"
                      >
                        <div className="projectandevent-image-name-and-date">
                          <img
                            src={event.logo}
                            alt={`${event.college} logo`}
                            className="projectandevent-event-logo"
                          />

                          <div className="projectandevent-event-header">
                            <h3 className="projectandevent-event-title">
                              {event.title}
                            </h3>
                            <p className="projectandevent-event-college">
                              {event.college}
                            </p>
                          </div>
                          <span className="projectandevent-event-date">
                            {event.date}
                          </span>
                        </div>
                        <div className="projectandevent-event-details">
                          <p className="projectandevent-event-description">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
        <div className="projectandevent-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default ProjectAndEvent;
