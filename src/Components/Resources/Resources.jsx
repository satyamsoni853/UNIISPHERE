// Imports
import React, { useState } from "react";
import "./Resources.css";
import ForYou from "./ForYou.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import Background from "../Background/Background";
import { IoReorderThreeOutline } from "react-icons/io5";

// Resources Component
function Resources() {
  // Data Arrays
  const books = [
    { title: "The Dark Deception", author: "Student eBooks" },
    { title: "A Time to Mourn and a Time to Dance", author: "Jennifer Ohman" },
    { title: "The Dark Past", author: "Sheren Mila" },
    { title: "Fire and Ice", author: "W. H. Smith" },
    { title: "Shard", author: "James E. Wisher" },
    { title: "Echoes of Eternity", author: "Laura K. James" },
    { title: "Shadows of Valor", author: "Mark T. Evans" },
  ];

  const explorationBooks = [
    { title: "E-Books", author: "George Keeley", price: 890, rent: 200 },
    { title: "E-Books", author: "George Keeley", price: 1000, rent: 190 },
    { title: "E-Books", author: "Esi Edugyan", price: 1600, rent: 200 },
    { title: "E-Books", author: "Kassi Wilson", price: 1490, rent: 410 },
    { title: "E-Books", author: "A. Reader", price: 1200, rent: 250 },
    {
      title: "Echoes of Eternity",
      author: "Laura K. James",
      price: 1300,
      rent: 300,
    },
    {
      title: "Shadows of Valor",
      author: "Mark T. Evans",
      price: 1100,
      rent: 220,
    },
    {
      title: "The Dark Deception",
      author: "Student eBooks",
      price: 890,
      rent: 200,
    },
  ];

  const notesItems = [
    { title: "Name of Note", price: 590, rent: 100 },
    { title: "Name of Note", price: 450, rent: 80 },
    { title: "Name of Note", price: 700, rent: 90 },
    { title: "Name of Note", price: 430, rent: 130 },
    { title: "Study Notes 1", price: 600, rent: 110 },
    { title: "Study Notes 2", price: 550, rent: 120 },
    { title: "Study Notes 3", price: 480, rent: 100 },
    { title: "Study Notes 4", price: 590, rent: 100 },
  ];

  const trendsItems = [
    {
      title: "New Youth, New Power",
      description:
        "eiufbiwlebfidbfhr, iwehfpieufblsbhfhr ygbhj hbdbf yfgqieuhfuidslk, aiuhggqyukbvshvbdhbruybsa, piauhruy hgrytqpuirgbhblfbjd,f, sodihiosdhosdnkdjslvfuhwoif;val, dhviofhvalknvdkvkdkjfvnfihvdjlvnk",
    },
    {
      title: "New Youth, New Power",
      description:
        "eiufbiwlebfidbfhr, iwehfpieufblsbhfhr ygbhj hbdbf yfgqieuhfuidslk, aiuhggqyukbvshvbdhbruybsa, piauhruy hgrytqpuirgbhblfbjd,f, sodihiosdhosdnkdjslvfuhwoif;val, dhviofhvalknvdkvkdkjfvnfihvdjlvnk",
    },
    {
      title: "New Youth, New Power",
      description:
        "eiufbiwlebfidbfhr, iwehfpieufblsbhfhr ygbhj hbdbf yfgqieuhfuidslk, aiuhggqyukbvshvbdhbruybsa, piauhruy hgrytqpuirgbhblfbjd,f, sodihiosdhosdnkdjslvfuhwoif;val, dhviofhvalknvdkvkdkjfvnfihvdjlvnk",
    },
    {
      title: "New Youth, New Power",
      description:
        "eiufbiwlebfidbfhr, iwehfpieufblsbhfhr ygbhj hbdbf yfgqieuhfuidslk, aiuhggqyukbvshvbdhbruybsa, piauhruy hgrytqpuirgbhblfbjd,f, sodihiosdhosdnkdjslvfuhwoif;val, dhviofhvalknvdkvkdkjfvnfihvdjlvnk",
    },
  ];

  const categoriesItems = [
    { label: "Novel" },
    { label: "Fiction" },
    { label: "Life Lesson" },
    { label: "Drama" },
    { label: "Poetry" },
  ];

  // State
  const [positions, setPositions] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [startIndex, setStartIndex] = useState(0);
  const [notesStartIndex, setNotesStartIndex] = useState(0);

  // Event Handlers
  const handleBookClick = (clickedIndex) => {
    if (
      clickedIndex !== 0 &&
      clickedIndex >= 0 &&
      clickedIndex < positions.length
    ) {
      const shift = clickedIndex;
      const newPositions = positions
        .slice(shift)
        .concat(positions.slice(0, shift));
      setPositions(newPositions);
    }
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + 4;
      return newIndex >= explorationBooks.length ? 0 : newIndex;
    });
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - 4;
      return newIndex < 0 ? Math.max(0, explorationBooks.length - 4) : newIndex;
    });
  };

  const handleNotesNext = () => {
    setNotesStartIndex((prevIndex) => {
      const newIndex = prevIndex + 4;
      return newIndex >= notesItems.length ? 0 : newIndex;
    });
  };

  const handleNotesPrev = () => {
    setNotesStartIndex((prevIndex) => {
      const newIndex = prevIndex - 4;
      return newIndex < 0 ? Math.max(0, notesItems.length - 4) : newIndex;
    });
  };

  // Data Slicing for Display
  const visibleBooks = explorationBooks.slice(startIndex, startIndex + 4);
  const visibleNotes = notesItems.slice(notesStartIndex, notesStartIndex + 4);

  const booksCompleted = 3;
  const totalGoal = 3;

  // Render
  return (
    <div>
      {/* Background and Navigation */}
      <Background />
      <DesktopNavbar />

      {/* Main Content */}
      <div className="Main-container">
        {/* Resources Header Section */}
        <div className="resources-container">
          <h1 className="resources-title">RESOURCES</h1>
          <p className="resources-subtitle">
            Get all the resources you will need
          </p>

          {/* Books Section */}
          <div className="books-circle-container">
            {books.map((book, index) => (
              <div
                key={index}
                className={`book-card book-card-${positions.indexOf(index)}`}
                onClick={() => handleBookClick(positions.indexOf(index))}
              >
                <div className="book-cover">
                  <img src={ForYou} alt="Book cover" className="book-image" />
                </div>
              </div>
            ))}
            <button className="for-you-button">For You</button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="resource-search-container">
          <input
            type="text"
            placeholder="Search"
            className="resource-search-input"
          />
          <div className="resource-user-reading">
            <div className="resource-user-avatar">
              <img src={ForYou} alt="User avatar 1" className="avatar-image" />
            </div>
            <div className="resource-user-avatar">
              <img src={ForYou} alt="User avatar 2" className="avatar-image" />
            </div>
            <div className="resource-user-avatar">
              <img src={ForYou} alt="User avatar 3" className="avatar-image" />
            </div>
            <div className="resource-user-avatar">
              <img src={ForYou} alt="User avatar 4" className="avatar-image" />
            </div>
            <span className="resource-user-reading">Reading</span>
          </div>
        </div>

        {/* Search Options */}
        <div className="Resource-search-options">
          <button className="Resource-option-button option-button-1">Recent</button>
          <button className="Resource-option-button option-button-2">2025</button>
          <button className="Resource-option-button option-button-3">Recent</button>
          <button className="Resource-option-button option-button-4">Saved</button>
        </div>

        {/* For You Section */}
        <div className="for-you-section">
          <h2 className="For-You-section-title">For You</h2>
          <div className="for-you-content">
            <div
              className="for-you-card ebooks-card"
              style={{ backgroundImage: `url(${ForYou})` }}
            >
              <div className="for-you-card-content">
                <div className="for-you-card-details">
                  <div className="for-you-card-title">E-Books</div>
                  <button className="for-you-card-button">Explore</button>
                </div>
                <img
                  src={ForYou}
                  className="for-you-card-image"
                  alt="E-Books"
                />
              </div>
            </div>
            <div
              className="for-you-card notes-card"
              style={{ backgroundImage: `url(${ForYou})` }}
            >
              <div className="for-you-card-content">
                <div className="for-you-card-details">
                  <div className="for-you-card-title">Notes</div>
                  <button className="for-you-card-button">Explore</button>
                </div>
                <img src={ForYou} className="for-you-card-image" alt="Notes" />
              </div>
            </div>
            <div
              className="for-you-card preferences-card"
              style={{ backgroundImage: `url(${ForYou})` }}
            >
              <div className="for-you-card-content">
                <div className="for-you-card-details">
                  <div className="for-you-card-title">Preferences</div>
                  <button className="for-you-card-button">Explore</button>
                </div>
                <img
                  src={ForYou}
                  className="for-you-card-image"
                  alt="Preferences"
                />
              </div>
            </div>
            <div
              className="for-you-card preferences-card"
              style={{ backgroundImage: `url(${ForYou})` }}
            >
              <div className="for-you-card-content">
                <div className="for-you-card-details">
                  <div className="for-you-card-title">Preferences</div>
                  <button className="for-you-card-button">Explore</button>
                </div>
                <img
                  src={ForYou}
                  className="for-you-card-image"
                  alt="Preferences"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Exploration Section */}
        <div className="exploration-section">
          
          <h2 className="section-title-Exploration">Exploration</h2>
         
          <div className="timer-container">
            <div>
              <p className="Reading-Time">Reading Time</p>
              <div className="timer-text-container">
                <p className="timer-text">0</p>
                <span>:</span>
                <p className="timer-text">0</p>
                <p className="timer-text">0</p>
              </div>
            </div>
            <br />
            <button className="timer-button">Continue</button>
          </div>
          <div className="exploration-content">
            <button className="nav-arrow left-arrow" onClick={handlePrev}>
              <IoChevronBack />
            </button>
            {visibleBooks.map((book, index) => (
              <div key={index} className="exploration-item-section">
                <div className="exploration-item">
                  <img
                    src={ForYou}
                    alt={book.title}
                    className="exploration-image"
                  />
                  <div className="exploration-details">
                    <h3 className="exploration-title">{book.title}</h3>
                    <p className="exploration-price">
                      Price-{book.price} Rent-{book.rent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button className="nav-arrow right-arrow" onClick={handleNext}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        {/* Notes Section */}
        <div className="notes-section">
          <h2 className="section-title-notes">Notes</h2>
          <div className="notes-content">
            <button className="nav-arrow left-arrow" onClick={handleNotesPrev}>
              <IoChevronBack />
            </button>
            {visibleNotes.map((note, index) => (
              <div className="notes-item-section">
                <div key={index} className="notes-item-container" >
                  <div className="notes-item">
                    <img
                      src={ForYou}
                      alt={note.title}
                      className="notes-image"
                    />
                  </div>
                  <div className="notes-details">
                    <h3 className="notes-title">{note.title}</h3>
                    <p className="notes-price">
                      Price-{note.price} Rent-{note.rent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button className="nav-arrow right-arrow" onClick={handleNotesNext}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        {/* Trends Section */}
        <div className="trends-section">
          <h2 className="section-title-Trends">Trends</h2>
          <div className="trends-content">
            {trendsItems.map((trend, index) => (
              <div className="Trend-item-section">
                <div key={index} className="trend-card">
                  <div
                    className="trend-card-image"
                    style={{ backgroundImage: `url(${ForYou})` }}
                  ></div>
                  <div className="trend-card-content">
                    <h3 className="trend-card-title">{trend.title}</h3>
                    <p className="trend-card-description">
                      {trend.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="categories-section">
          <h2 className="section-title-Categories">Categories</h2>
          <div className="categories-content">
            {categoriesItems.map((category, index) => (
              <div className="Categories-item-section">
                <div key={index} className="category-card">
                  <div className="category-image-outer">
                    <img
                      src={ForYou}
                      alt={category.label}
                      className="category-image"
                    />
                  </div>
                  <p className="category-label">{category.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Books Completed Section */}
        <div className="remaining-section">
          <p className="remaining-subheading">
            {totalGoal - booksCompleted} remaining for the Goal
          </p>
          <h3 className="remaining-label">Books Completed</h3>
          <div className="resource-progress-indicator">
            {Array.from({ length: totalGoal }, (_, index) => (
              <div
                key={index}
                className={`progress-item ${
                  index < booksCompleted ? "completed" : ""
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <a href="#" className="suggested-link">
            Read Suggested
          </a>
        </div>
      </div>
    </div>
  );
}

export default Resources;