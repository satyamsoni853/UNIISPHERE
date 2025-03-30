import React, { useState } from "react";
import "./ProjectAndEvent.css";
import profileImage from "./profilePhoto.png";
function ProjectAndEvent() {



  const [Collaborations, setCollaborations] = useState(true);

  const collaboratorsgradients = [
    'linear-gradient(to bottom,  #ddf3fb,  #faf1be)',
    'linear-gradient(to bottom, #fbdddd,#cecbf6)',
    
    
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

  // Event data
  const [event, setEvent] = useState(false);

  const gradients = [
    'linear-gradient(to bottom,  #F7FFF5,  #ECF0FF)',
    'linear-gradient(to bottom, #FFF5F5,#ECFFFD)',
    'linear-gradient(to bottom, #FFFEF5, #EFECFF)',
    'linear-gradient(to bottom, #FFF5FD, #FFFEEC)',
    
  ];
  const [events, setEvents] = useState([
    {
      title: "COLLEGE FESTS",
      college: "Kirorimal College",
      date: "12-Apr-2025",
      description:
        "Book and Meet with the experts in there which respective fields. To get the shortcuts of success Book and Meet with the experts in there which …..",
      logo: profileImage, // Replace with actual path
    },
    {
      title: "FRESHERS PARTY",
      college: "Hindu College",
      date: "07-Jan-2025",
      description:
        "Book and Meet with the experts in there which respective fields. To get the shortcuts of success Book and Meet with the experts in there which …..",
      logo: profileImage, // Replace with actual path
    },
    {
      title: "FAREWELL PARTY",
      college: "Aryabhat College",
      date: "25-May-2025",
      description:
        "Book and Meet with the experts in there which respective fields. To get the shortcuts of success Book and Meet with the experts in there which …..",
      logo: profileImage, // Replace with actual path
    },
    {
      title: "DIWALI EVENT",
      college: "Ramjas College",
      date: "31-Oct-2025",
      description:
        "Book and Meet with the experts in there which respective fields. To get the shortcuts of success Book and Meet with the experts in there which …..",
      logo: profileImage, // Replace with actual path
    },
  ]);
  return (
    <div className="main-container">
      <div className="project-card">
        <div className="header">
          <button
          onClick={()=>{
            setEvent(true)
            setCollaborations(false)
          }}
          className="tab1">Events</button>
          <button
          onClick={()=>{
            setCollaborations(true)
            setEvent(false)
          }}
          className="tab2">Collaboration</button>
        </div>

        {Collaborations && (
          <div className="down-container">
            <div className="content">
              <img
                src={profileImage}
                alt={personName}
                className="profile-pic"
              />
              <div>
                <h2>{projectName}</h2>
              </div>
            </div>

            <div className="headline-and-name">
              <h2>{personName}</h2>
              <p className="headline"> {personHeadline}</p>
            </div>

            <div className="description">
              <h2>Description</h2>
              <p> {description}</p>
            </div>

            <div className="project-details">
              <h2>Project Details</h2>
              <ul className="project-tech">
                {details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="collaborators">
              {collaborators.map((collab, index) => (
                <div key={index} 
                style={{
                  background: collaboratorsgradients[index % gradients.length],
                }}
                className="collaborator">
                  <div className="collaborator-img">
                    <img
                      src={profileImage}
                       
                      alt=""
                    />
                  </div>
                  <div className="collabrator-details">
                    <h2 className="collaborator-name">{collab.name}</h2>
                    <p className="collaborator-para">{collab.info}</p>
                  </div>
                </div>
              ))}

              <div className="others">7+ others</div>
            </div>
            <ul></ul>
          </div>
        )}

        {event && (
          <div className="collaborations-container">
            <div className="events-page">
              <div className="event-list">
                {events.map((event, index) => (
                  <div key={index} 
                  style={{
                    background: gradients[index % gradients.length],
                  }}
                  className="event-card">
                    <div className="image-name-and-date">
                      <img
                        src={event.logo}
                        alt={`${event.college} logo`}
                        className="event-logo"
                      />

                      <div className="event-header">
                        <h3 className="event-title">{event.title}</h3>

                        <p className="event-college">{event.college}</p>
                      </div>
                      <span className="event-date">{event.date}</span>
                    </div>
                    <div className="event-details">
                      <p className="event-description">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectAndEvent;
