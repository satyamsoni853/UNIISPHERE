import React, { useState, useRef, useEffect } from "react";
import "./UploadSection.css";
import backicon from "./backsvg.svg";
import profileImage from './profilephoto.png'
const UploadSection = () => {
const [showPostDetails,setShowPostDetails]=useState(false)
const [showAddmore,setShowAddMore]=useState(true)
    const [caption, setCaption] = useState("");
    const [hideLikes, setHideLikes] = useState(false);
    const [disableComments, setDisableComments] = useState(false);
    const [mentions, setMentions] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const inputRef = useRef(null);

  // Handle file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const previewURL = URL.createObjectURL(file);
        setMediaList(prev => [
          ...prev,
          {
            file,
            previewURL,
            mediaType: file.type.startsWith("image/") ? "image" : "video",
            comment: ""
          }
        ]);
      }
    });
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const previewURL = URL.createObjectURL(file);
        setMediaList(prev => [
          ...prev,
          {
            file,
            previewURL,
            mediaType: file.type.startsWith("image/") ? "image" : "video",
            comment: ""
          }
        ]);
      }
    });
  };

   
  
  // Cleanup object URLs
  useEffect(() => {
    return () => {
      mediaList.forEach(media => URL.revokeObjectURL(media.previewURL));
    };
  }, [mediaList]);

  return (
    <div className="main-container">
      {( mediaList.length === 0)&& (
        <div
          className="upload-container"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className="upload-text">Drag & Drop your media here</p>
          <button
            className="upload-button"
            onClick={() => inputRef.current.click()}
          >
            Upload from computer
          </button>
        </div>
      )  }
       {(mediaList.length!==0 && showAddmore) && (
         <div className="after-upload">
         <div className="navbar">
           <img src={backicon} alt="Back" />
           <h6
           onClick={()=>{
               setShowPostDetails(true)
               setShowAddMore(false)
           }} 
           >Continue</h6>
         </div>

         <div className="preview-container">
           {mediaList.map((media, index) => (
             <div key={index} className="media-item">
               {media.mediaType === "image" ? (
                 <img
                   className="imageAndVideo"
                   src={media.previewURL}
                   alt="Uploaded media"
                 />
               ) : (
                 <video
                   className="imageAndVideo"
                   src={media.previewURL}
                   controls
                 />
               )}
               
             </div>
           ))}
         </div>

         <button
           className="add-more-btn"
           onClick={() => inputRef.current.click()}
         >
           Add More
         </button>
       </div>
       )}
    

      <input
        type="file"
        accept="image/*,video/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileChange}
        multiple
      />


{/* Create post  div */}
{showPostDetails &&(<div className="create-post-main-container">
      <div className="create-post-after-upload">
        <div className="create-post-navbar">
         <div className="image-and-name">
         <img src={profileImage} alt="profileImage" />  
         <h3>Himanshu Choudary</h3>
         </div>
          <h6>Create Post</h6>
        </div>

        <div className="post-content-container">
          {/* Caption Section and Image section*/} 

        <div className="image-and-caption">
        {mediaList.map((media,index) =>(
            <div key={index} className="post-media-container">
                  {media.mediaType === "image" ? (
                  <img
                    className="create-post-imageAndVideo"
                    src={media.previewURL}
                    alt="Uploaded media"
                  />
                ) : (
                  <video
                    className="create-post-imageAndVideo"
                    src={media.previewURL}
                    controls
                  />
                )}
            </div>
          ))}
              <div className="form-group">
            <label className="input-label">Caption</label>
            <textarea
              className="caption-input"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows="4"
            />
          </div>
        </div>
      

          {/* Add Mentions */}
          <div className="mention-form-group">
            <label className="input-label">Add Mentions</label>
            <div className="mention-button">
              +  
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="privacy-settings">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Hide Likes</h4>
                <p className="setting-description">
                  No one will be able to see the number of likes on your post. Except you
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={hideLikes}
                  onChange={(e) => setHideLikes(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Turn Off Comments</h4>
                <p className="setting-description">
                  No one will be able to comment on this post
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={disableComments}
                  onChange={(e) => setDisableComments(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
)}
    </div>
  );
};

export default UploadSection;