import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PersonalInfoUpdate.css";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftBottomSection from '../DesktopLeftBottomSection/DesktopLeftBottomSection.jsx'
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbar from  '../DesktopNavbar/DesktopNavbar.jsx'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter";

function PersonalInfoUpdate() {
  console.log("Component mounted");
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const [profileData, setProfileData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    headline: "",
    college: "",
    degree: "",
    location: "",
    PhoneNumber: "",
    Gender: "",
    About: "",
    workorProject: "",
    startYear: "",
    endYear: "",
    Skills: [],
    Interests: []
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const authToken = localStorage.getItem("authToken");

        console.log("Fetching user data...");
        console.log("User ID from localStorage:", userId);
        console.log("Auth Token available:", !!authToken);

        if (!userId || !authToken) {
          throw new Error("Authentication required");
        }

        const response = await axios.get(
          "https://uniisphere-1.onrender.com/users/profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("Profile fetch response:", response.data);

        if (response.status === 200) {
          const userData = response.data;
          console.log("Setting profile data:", userData);
          setProfileData({
            username: userData.username || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            headline: userData.headline || "",
            college: userData.college || "",
            degree: userData.degree || "",
            location: userData.location || "",
            PhoneNumber: userData.PhoneNumber || "",
            Gender: userData.Gender || "",
            About: userData.About || "",
            workorProject: userData.workorProject || "",
            startYear: userData.startYear || "",
            endYear: userData.endYear || "",
            Skills: userData.Skills || [],
            Interests: userData.Interests || []
          });
          setPreviewUrl(userData.profilePictureUrl);
          console.log("Profile data set successfully");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        console.error("Error response:", err.response?.data);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (field, value) => {
    console.log(`Updating field: ${field} with value:`, value);
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name, "Size:", file.size);
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    console.log("Removing profile picture");
    setProfilePicture(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async () => {
    try {
      console.log("Starting profile update...");
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const authToken = localStorage.getItem("authToken");

      console.log("User ID for update:", userId);
      console.log("Auth token available:", !!authToken);

      if (!userId || !authToken) {
        throw new Error("Authentication required");
      }

      const formData = new FormData();
      
      // Add userid (lowercase as expected by backend)
      formData.append("userId", userId);
      console.log("Added userid to form data:", userId);
      
      // Append all profile data, handling arrays and empty values properly
      Object.entries(profileData).forEach(([key, value]) => {
        // Skip empty values
        if (value === "" || value === null || value === undefined) {
          return;
        }

        // Special handling for headline
        if (key === 'headline') {
          formData.append('headline', JSON.stringify({ text: value }));
          console.log(`Appending headline as object:`, { text: value });
          return;
        }

        // Handle arrays - only append if they have items
        if (Array.isArray(value)) {
          if (value.length > 0) {
            formData.append(key.toLowerCase(), JSON.stringify(value));
            console.log(`Appending array ${key.toLowerCase()}:`, value);
          }
        } else {
          // For non-array values, append with lowercase keys
          formData.append(key.toLowerCase(), value);
          console.log(`Appending field ${key.toLowerCase()}:`, value);
        }
      });

      // Log all form data entries
      for (let pair of formData.entries()) {
        console.log("Form data entry:", pair[0], pair[1]);
      }

      // Append profile picture if changed
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
        console.log("Added profile picture to form data");
      }

      // Ensure token has Bearer prefix
      const tokenWithBearer = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;

      console.log("Sending PATCH request to update profile...");
      const response = await axios.patch(
        "https://uniisphere-1.onrender.com/users/profile",
        formData,
        {
          headers: {
            'Authorization': tokenWithBearer
          }
        }
      );

      console.log("Update response:", response.data);

      if (response.status === 200) {
        console.log("Profile updated successfully");
        alert("Profile updated successfully!");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
        console.error("Request config:", {
          url: err.config.url,
          method: err.config.method,
          headers: err.config.headers
        });
        
        if (err.response.status === 401) {
          alert("Session expired or unauthorized. Please log in again.");
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          navigate("/login");
        } else if (err.response.status === 500) {
          setError("Server error. Please try again later.");
          console.error("Server error details:", err.response.data);
        } else {
          setError(err.response.data.message || "Failed to update profile. Please try again.");
        }
      } else if (err.request) {
        console.error("Network error details:", {
          readyState: err.request.readyState,
          status: err.request.status,
          statusText: err.request.statusText
        });
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DesktopNavbar />

      <div className="PersonalInfoUpdate-main-container">
        <Background />
        <div className="PersonalInfoUpdate-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottomSection />
        </div>
        <div className="PersonalInfoUpdate-middle-main-container">
          <div className="PersonalInfoUpdate-profile-card">
            <IoArrowBackCircleOutline 
              className="PersonalInfoUpdate-IoArrowBackCircleOutline" 
              onClick={() => navigate(-1)}
            />
            <div className="PersonalInfoUpdate-photo-section">
              <div className="PersonalInfoUpdate-profile-photo">
                {previewUrl && (
                  <img 
                    src={previewUrl} 
                    alt="Profile" 
                    className="PersonalInfoUpdate-profile-preview"
                  />
                )}
              </div>
              <div className="PersonalInfoUpdate-button-group">
                <label className="PersonalInfoUpdate-edit-photo">
                  Edit Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
                <button 
                  className="PersonalInfoUpdate-remove-photo"
                  onClick={handleRemovePhoto}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="PersonalInfoUpdate-info-section">
              {error && (
                <div className="PersonalInfoUpdate-error">
                  {error}
                </div>
              )}
              <div className="PersonalInfoUpdate-info-item">
                <label>Username</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>First Name</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Last Name</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Headline</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.headline}
                  onChange={(e) => handleChange("headline", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>College/University</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.college}
                  onChange={(e) => handleChange("college", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Degree</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.degree}
                  onChange={(e) => handleChange("degree", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Location</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Phone Number</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.PhoneNumber}
                  onChange={(e) => handleChange("PhoneNumber", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Gender</label>
                <select
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.Gender}
                  onChange={(e) => handleChange("Gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>About</label>
                <textarea
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.About}
                  onChange={(e) => handleChange("About", e.target.value)}
                  rows={4}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Work/Project</label>
                <input
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.workorProject}
                  onChange={(e) => handleChange("workorProject", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>Start Year</label>
                <input
                  type="number"
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.startYear}
                  onChange={(e) => handleChange("startYear", e.target.value)}
                />
              </div>
              <div className="PersonalInfoUpdate-info-item">
                <label>End Year</label>
                <input
                  type="number"
                  className="PersonalInfoUpdate-info-box"
                  value={profileData.endYear}
                  onChange={(e) => handleChange("endYear", e.target.value)}
                />
              </div>
              <button 
                className="PersonalInfoUpdate-submit-button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
          {isMobile && <MobileFooter />}
        </div>
        <div className="PersonalInfoUpdate-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoUpdate;
