import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './DesFollowerMiddleSectionPrivacy.css';
import { GoLock } from 'react-icons/go';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import PersonImage from './Person.png';
import MiddleConnectImage from './middleconnectimage.png';
import ConnectImage from './Connect.png';
import DesktopRight from '../DesktopRight/DesktopRight';
import DesktopLeftBottom from '../DesktopLeftBottom/DesktopLeftBottom';
import DesktopLeftTop from '../DesktopLeftTop/DesktopLeftTop';
import Background from '../Background/Background';
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar';
import MobileFooter from '../Mobilefooter/MobileFooter';

function DesFollowerMiddleSectionPrivacy() {
  const [searchParams] = useSearchParams();
  const queryUserId = searchParams.get('userId');
  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId || queryUserId;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  // Reset connectionStatus on component mount
  useEffect(() => {
    setConnectionStatus(null);
  }, []);

  // Default data
  const defaultData = {
    profilePictureUrl: PersonImage,
    profilePic: PersonImage,
    collabs: 78,
    connections: 248,
    name: 'Himanshu Choudhary',
    firstName: 'Himanshu',
    lastName: 'Choudhary',
    title: 'Building Himansphere',
    headline: 'Building Himansphere',
    about:
      'The actual idea of Unisphere was The Founder Himanshu who worked for months to think and plan all the essential stuffs to make time a reality. He envisioned a platform that connects people for collaboration and growth.',
    collaboratorName: 'Viraj Verma',
    education: ['UPES - MBA', 'IITR, Haridwar, Kartikey'],
    paragraph:
      'Founder Himanshu who worked for months to think and plan all the essential stuffs to make the idea and dream to be a on ground working.',
    skills: ['UI/UX', 'JAVA', 'CSS', 'C++', 'Python', 'Photoshop'],
    fullAboutText:
      'The actual idea of Unisphere was The Founder Himanshu who worked for months to think and plan all the essential stuffs to make time a reality. He envisioned a platform that connects people for collaboration and growth.',
    college: 'Masters Union',
    degree: 'SBM',
    workorProject: 'Building Unisphere',
    subCollabrators: ['KILL', 'Himanshu', 'kartikey'],
    _count: {
      connections1: 78,
      connections2: 248,
    },
  };

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        setError('No user ID provided. Using default data.');
        setProfileData(defaultData);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('AuthToken');
        const response = await fetch(
          `https://uniisphere-1.onrender.com/getProfile/profile/?userId=${userId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to fetch profile: ${response.status} - ${text}`);
        }

        const data = await response.json();
        setProfileData(data[0] || defaultData);
      } catch (err) {
        console.error('Fetch Profile Error:', err);
        setError(`Failed to load profile data: ${err.message}. Using default data.`);
        setProfileData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  // Send connection request
  const sendConnectionRequest = async () => {
    try {
      const token = localStorage.getItem('AuthToken');
      const senderId = localStorage.getItem('LoginuserId');
      const receiverId = localStorage.getItem('SearchUserId') || userId;

      if (!token || !senderId || !receiverId) {
        setError('Missing required data: Please ensure you are logged in');
        return;
      }

      if (senderId === receiverId) {
        setError('You cannot send a connection request to yourself');
        return;
      }

      const response = await fetch(
        `https://uniisphere-1.onrender.com/api/connect/${receiverId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: senderId,
            senderName: profileData?.name || 'User',
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      setConnectionStatus('requested');
    } catch (err) {
      console.error('Connection Request Error:', err);
      setError(err.message || 'Failed to send connection request');
      setConnectionStatus(null);
    }
  };

  // Toggle about section
  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Render connect button or message
  const renderConnectButton = () => {
    if (connectionStatus === 'requested') {
      return (
        <div className="connect-button-wrapper" role="status" aria-label="Connection request sent">
          <span className="connection-status-message">Your request is sent</span>
        </div>
      );
    }

    return (
      <div
        className="connect-button-wrapper"
        onClick={sendConnectionRequest}
        role="button"
        aria-label="Connect with user"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && sendConnectionRequest()}
      >
        <img src={ConnectImage} alt="Connect" className="connect-button-img" />
      </div>
    );
  };

  // Use API data or default data
  const data = profileData || defaultData;
  const maxLength = 100;
  const displayedText = isExpanded
    ? data.about
    : `${data.about?.slice(0, maxLength)}${data.about?.length > maxLength ? '...' : ''}`;

  if (loading) return <div className="loading-message">Loading...</div>;

  return (
    <div className="desktop-view-wrapper">
      <DesktopNavbar />
      <div className="interest-main-container">
        <Background />
        <aside className="interest-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottom />
        </aside>
        <main className="interest-middle-main-container">
          <div className="followers-middle-section-1-main-parent-privacy">
            <div className="followers-middle-section-1-middle-container-privacy">
              <div className="followers-middle-section-1-middle-section-privacy">
                {error && <div className="error-message">{error}</div>}

                <div className="followers-middle-section-1-top-nav">
                  <IoArrowBackCircleOutline
                    className="followers-middle-section-1-circle-back-icon"
                    onClick={() => window.history.back()}
                    role="button"
                    aria-label="Go back"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && window.history.back()}
                  />
                  <img src={MiddleConnectImage} alt="Connect" />
                </div>

                <div className="followers-middle-section-1-profile-header-privacy">
                  <div className="followers-middle-section-1-image-container-privacy">
                    <img
                      src={data.profilePictureUrl || data.profilePic || PersonImage}
                      alt={`${data.name || 'User'}'s profile`}
                      className="followers-middle-section-1-profile-pic-privacy"
                    />
                  </div>
                  <div className="followers-middle-section-1-collabs-details-privacy">
                    <h4>Connections</h4>
                    <span>{data._count?.connections2 ?? data.connections ?? 0}</span>
                  </div>
                  <div className="followers-middle-section-1-connections-details-privacy">
                    <h4>Collabs</h4>
                    <span>{data._count?.connections1 ?? data.collabs ?? 0}</span>
                  </div>
                </div>

                <div className="followers-middle-section-1-profile-info-privacy">
                  <h3>
                    {data.firstName || data.name} {data.lastName || ''}
                  </h3>
                  <p>
                    {data.headline || data.title || 'N/A'} | {data.workorProject || data.college || 'N/A'}
                  </p>
                </div>

                {renderConnectButton()}

                <div className="followers-middle-section-1-profile-buttons-privacy">
                  <button>{data.college || 'N/A'}</button>
                  <button>{data.degree || 'N/A'}</button>
                </div>

                <div className="followers-middle-section-1-about-section-privacy">
                  <p className="des-follower-middle-section-privacy-heading">About</p>
                  <p>
                    {displayedText}
                    {data.about?.length > maxLength && (
                      <button
                        className="followers-middle-section-1-about-button-privacy"
                        onClick={toggleExpand}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? 'See Less' : 'See More'}
                      </button>
                    )}
                  </p>
                </div>

                <div className="followers-middle-section-1-collabs-section-privacy">
                  <p className="des-follower-middle-section-privacy-heading">Collabs</p>
                  <div className="followers-middle-section-1-collaborator-card-privacy">
                    <div className="followers-middle-section-1-collaborator-lower-left-privacy">
                      <div className="followers-middle-section-1-collab-profile-privacy">
                        <div className="followers-middle-section-1-collab-image-privacy">
                          <img src={PersonImage} alt="Collaborator" />
                        </div>
                        <div className="followers-middle-section-1-collaborator-details-privacy">
                          <div className="followers-middle-section-1-education-privacy">
                            {(data.education || defaultData.education).map((val, index) => (
                              <h6 key={index}>{val}</h6>
                            ))}
                          </div>
                          <div className="full-middle-section-1-subcollaborators-container-privacy">
                            {(data.subCollabrators || defaultData.subCollabrators).map((val, index) => (
                              <h5
                                key={index}
                                className="followers-middle-section-1-sub-collaborators-privacy"
                              >
                                {val},
                              </h5>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="followers-middle-section-1-para-privacy">
                        <h6>{data.paragraph || defaultData.paragraph}</h6>
                      </div>
                    </div>
                    <div className="followers-middle-section-1-icon-and-image-privacy">
                      <img src={PersonImage} alt="Person" />
                      <RiArrowDropRightLine className="followers-middle-section-1-paragraph-icon-privacy" />
                    </div>
                  </div>
                </div>

                <div className="followers-middle-section-1-skills-section-privacy">
                  <p className="des-follower-middle-section-privacy-heading">Skills</p>
                  <div className="followers-middle-section-1-skill-list-privacy">
                    {(data.skills || defaultData.skills).map((val, index) => (
                      <div
                        key={index}
                        className="followers-middle-section-1-skills-mini-div-privacy"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="followers-middle-section-1-blur-privacy">
                  <div className="followers-middle-section-1-lock-privacy">
                    <GoLock className="followers-middle-section-1-lock-icon-privacy" />
                  </div>
                  <div className="followers-middle-section-1-headings-privacy">
                    <h4>Do you know privacy?</h4>
                    <h4>Connect to explore further</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="interest-section-mobile-footer">
              <MobileFooter />
            </div>
          </div>
        </main>
        <aside className="interest-right-main-container">
          <DesktopRight />
        </aside>
      </div>
    </div>
  );
}

export default DesFollowerMiddleSectionPrivacy;