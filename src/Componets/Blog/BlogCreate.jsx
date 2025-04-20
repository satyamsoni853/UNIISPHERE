import React, { useEffect } from "react";
import backIcon from "./backsvg.svg";
import "./BlogCreate.css";

import { useRef, useState } from "react";
import DesktopRightsection from "../DesktopRight/DesktopRight";
import Background from "../Background/Background";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr";
import profile from "./profile.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
``
const check = "https://youtu.be/oolJWcOhHCw?si=2I7a2i3PAeTiOoxT";
const BlogCreate = () => {
  const Navigate = useNavigate();
   
  const [showDefaultCreateBlog, setShowDefaultCreateBlog] =
    useState(true);
  const [showUpdateBlog, setShowUpdateBlog] = useState(false);
  const inputref = useRef(null);
  const [file, setFile] = useState(check);
  const [objectUrl, setObjectUrl] = useState(null);
  // Handle file selection
  const handleFileChange = (event) => {
    // Revoke the previous object URL if it exists to free memory
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    // Get the selected file (single file selection)
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Create a temporary URL for the file
      const newObjectUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setObjectUrl(newObjectUrl);
    } else {
      // Clear state if no file is selected
      setFile(check);
      setObjectUrl(check);
    }
  };

  // Cleanup: Revoke object URL when the component unmounts
  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file, objectUrl]);
  const [posts, setPosts] = useState([
    {
      author: "Vijay Prasad",
      affiliation: "University of Delhi...",
      timestamp: "18h",
      title: "Again the notice",
      content:
        "Vijay Prashad  Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the of.Been have evolved to go in the university and will probably prefer the university of.Been have evolved to go in the university and will probably prefer the university of.",
      likes: 4012,
      imageUrl: file, // Replace with actual image path
    },
  ]);
  const blogList = [
    {
      name: "Arjun Verma",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Sakshi Soni",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Vijay Sharma",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Arjun Singh",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Juhi Sharma",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Vijay Sharma",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
    {
      name: "Arjun Verma",
      description:
        "As per the rumors it is said that the elections of this year is going",
      avatar: profile,
    },
  ];

  return (
  <>
  <div className="desktop-blog-main-parent-container">
  <div className="desktop-blog-main-wrapper">
      <div className="desktop-blog-nav-fixed">
        <DesktopNavbarr />
      </div>
      <div className="desktop-blog-background">
        <Background />
      </div>
      <div className="desktop-blog-container">
        <div className="desktop-blog-main-sidebar">
          <div className="desktop-blog-nav">
            <div className="desktop-blog-dropdown">
              Recommended <IoIosArrowDown />
            </div>
            <Link to={"/createblog"}>
              <button
                onClick={() => {
                  setShowDesktopDefaultSection(false);
                }}
                className="desktop-blog-create-btn"
              >
                + CREATE
              </button>
            </Link>
          </div>
          <div className="desktop-blog-sidebar-blogs">
            <div className="desktop-blog-sidebar-blogs-title">Top Blogs</div>
            <div className="desktop-blog-sidebar-blogs-list">
              {blogList.map((blog, index) => (
                <div key={index} className="desktop-blog-sidebar-blogs-item">
                  <img
                    src={blog.avatar}
                    alt="Avatar"
                    className="desktop-blog-sidebar-blogs-avatar"
                  />
                  <div className="desktop-blog-sidebar-blogs-text">
                    <div className="desktop-blog-sidebar-blogs-name">
                      {blog.name}
                    </div>
                    <div className="desktop-blog-sidebar-blogs-description">
                      {blog.description}
                      <span className="desktop-blog-more-link">...more</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
       <div className="desktop-blog-create-content-parent">
         {showDefaultCreateBlog && (
           <div className="desktop-blog-create-content">
           <div className="desktop-blog-create-section-wrapper">
             <header className="desktop-blog-create-header">
               <img
                 onClick={() => Navigate(-1)} // Navigate back to the previous page
                 className="desktop-blog-create-backIcon"
                 src={backIcon}
                 alt=""
               />
               <h1 className="desktop-blog-create-header-heading">
                 Create Blog
               </h1>
             </header>
           </div>
           <div className="desktop-blog-create-section-wrapper">
             <section className="desktop-blog-create-form">
               <div className="desktop-blog-create-input-group">
                 <label
                   htmlFor="headline"
                   className="desktop-blog-create-label"
                 >
                   Headline
                 </label>
                 <input
                   type="text"
                   id="headline"
                   className="desktop-blog-create-input"
                 />
               </div>
               <div className="desktop-blog-create-input-group">
                 <label
                   htmlFor="written-by"
                   className="desktop-blog-create-label"
                 >
                   Written by
                 </label>
                 <input
                   type="text"
                   id="written-by"
                   className="desktop-blog-create-input"
                 />
               </div>
               <div className="desktop-blog-create-input-group">
                 <label htmlFor="about" className="desktop-blog-create-label">
                   About
                 </label>
                 <textarea
                   id="about"
                   className="desktop-blog-create-textarea"
                 ></textarea>
               </div>
             </section>
           </div>
           <div className="desktop-blog-create-section-wrapper">
             <section className="desktop-blog-create-media-upload">
               <div className="desktop-blog-create-media-container">
                 <input
                   type="file"
                   accept="image/, video/"
                   className="desktop-blog-create-media-input"
                   style={{ display: "none" }}
                   ref={inputref}
                   onChange={handleFileChange}
                 />
                 <button
                   onClick={() => inputref.current.click()}
                   className="desktop-blog-create-upload-button"
                 >
                   Upload media
                 </button>
                 <p className="desktop-blog-create-instructional-text">
                   {objectUrl
                     ? "File selected"
                     : "  Add media to make your blog more attractive & relative."}
                 </p>
               </div>
             </section>
           </div>
           <div className="desktop-blog-create-section-wrapper">
             <footer className="desktop-blog-create-actions">
             <div className="desktop-blog-both-buttons">
             <button
               onClick={() => { 
                 Navigate(-1)  // Navigate back to the previous page 
               }
               }
               className="desktop-blog-create-cancel-button">
                 Cancel
               </button>
               <button className="desktop-blog-create-upload-button-2">
                 Create
               </button>
             </div>
             <div className="desktop-blog-both-buttons">
               <button className="desktop-blog-create-delete-button ">
                 Delete
               </button>
               <button 
               onClick={()=>{
                setShowUpdateBlog(true)
                setShowDefaultCreateBlog(false)
               }}
               className="desktop-blog-create-update-button  ">
                 Update
               </button>
             </div>
             </footer>
           </div>
         </div>
         )}

         {showUpdateBlog && (
           <div className="desktop-blog-create-content">
           <div className="desktop-blog-create-section-wrapper">
             <header className="desktop-blog-create-header">
               <img
                 onClick={() => Navigate(-1)} // Navigate back to the previous page
                 className="desktop-blog-create-backIcon"
                 src={backIcon}
                 alt=""
               />
               <h1 className="desktop-blog-create-header-heading">
                Update Blog
               </h1>
             </header>
           </div>
           <div className="desktop-blog-create-section-wrapper">
             <section className="desktop-blog-create-form">
               <div className="desktop-blog-create-input-group">
                 <label
                   htmlFor="headline"
                   className="desktop-blog-create-label"
                 >
                   Headline
                 </label>
                 <input
                   type="text"
                   id="headline"
                   className="desktop-blog-create-input"
                 />
               </div>
               <div className="desktop-blog-create-input-group">
                 <label
                   htmlFor="written-by"
                   className="desktop-blog-create-label"
                 >
                   Written by
                 </label>
                 <input
                   type="text"
                   id="written-by"
                   className="desktop-blog-create-input"
                 />
               </div>
               <div className="desktop-blog-create-input-group">
                 <label htmlFor="about" className="desktop-blog-create-label">
                   About
                 </label>
                 <textarea
                   id="about"
                   className="desktop-blog-create-textarea"
                 ></textarea>
               </div>
             </section>
           </div>
           <div className="desktop-blog-create-section-wrapper">
             <section className="desktop-blog-create-media-upload">
               <div className="desktop-blog-create-media-container">
                 <input
                   type="file"
                   accept="image/, video/"
                   className="desktop-blog-create-media-input"
                   style={{ display: "none" }}
                   ref={inputref}
                   onChange={handleFileChange}
                 />
                 <button
                   onClick={() => inputref.current.click()}
                   className="desktop-blog-create-upload-button"
                 >
                   Upload media
                 </button>
                 <p className="desktop-blog-create-instructional-text">
                   {objectUrl
                     ? "File selected"
                     : "  Add media to make your blog more attractive & relative."}
                 </p>
               </div>
             </section>
           </div>
           <div className="desktop-blog-create-section-wrapper">
             <footer className="desktop-blog-create-actions">
             <div className="desktop-blog-both-buttons">
             <button
               onClick={() => { 
              setShowUpdateBlog(false)
              setShowDefaultCreateBlog(true) 
               }
               }
               className="desktop-blog-create-cancel-button">
                 Cancel
               </button>
               <button className="desktop-blog-create-update-button  ">
                 Update
               </button>
             </div>
            
             </footer>
           </div>
         </div>
         )}
          <div className="desktop-right-section-fixed">
            <DesktopRightsection />
          </div>
        </div>

      
      </div>
    </div>
  </div>
  </>
  );
};

export default BlogCreate;