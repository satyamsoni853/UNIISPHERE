import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./Books.css";
import ForYou from "./ForYou.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { IoArrowBackCircleOutline, IoChevronBack } from "react-icons/io5";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import MobileFooter from "../Mobilefooter/MobileFooter";
import MobileNavbar from "../MobileNavbar/MobileNavbar";
import Background from "../Background/Background";

const Books = () => {
  // Fetch books from API using token and userId from localStorage
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Retrieve token and userId from localStorage
        const token = localStorage.getItem("authToken") || localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          console.error("Token or userId not found in localStorage");
          return;
        }
        console.log("Token:", token);

        const response = await axios.get(
          "https://uniisphere-backend-latest.onrender.com/api/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-User-ID": userId, // Pass userId in a custom header
            },
            timeout: 10000, // 10-second timeout
          }
        );

        console.log("API Response:", response.data); // Log response to console
      } catch (error) {
        console.error("Error fetching books:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
      }
    };

    fetchBooks();
  }, []); // Empty dependency array to run once on mount

  // Your existing static data (unchanged)
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
      author: "Student E-Books",
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

  const universityItems = [
    { title: "Name of Note", price: 590, rent: 100 },
    { title: "Name of Note", price: 450, rent: 80 },
    { title: "Name of Note", price: 700, rent: 90 },
    { title: "Name of Note", price: 430, rent: 130 },
    { title: "Study Notes 1", price: 600, rent: 110 },
    { title: "Study Notes 2", price: 550, rent: 120 },
    { title: "Study Notes 3", price: 480, rent: 100 },
    { title: "Study Notes 4", price: 590, rent: 100 },
  ];

  const lifeLessonItems = [
    { title: "Name of Note", price: 590, rent: 100 },
    { title: "Name of Note", price: 450, rent: 80 },
    { title: "Name of Note", price: 700, rent: 90 },
    { title: "Name of Note", price: 430, rent: 130 },
    { title: "Study Notes 1", price: 600, rent: 110 },
    { title: "Study Notes 2", price: 550, rent: 120 },
    { title: "Study Notes 3", price: 480, rent: 100 },
    { title: "Study Notes 4", price: 590, rent: 100 },
  ];

  // State for carousel navigation (unchanged)
  const [startIndex, setStartIndex] = useState(0);
  const [notesStartIndex, setNotesStartIndex] = useState(0);
  const [universityStartIndex, setUniversityStartIndex] = useState(0);
  const [lifeLessonStartIndex, setLifeLessonStartIndex] = useState(0);

  // Data slicing for display (unchanged)
  const visibleBooks = explorationBooks.slice(startIndex, startIndex + 4);
  const visibleNotes = notesItems.slice(notesStartIndex, notesStartIndex + 4);
  const visibleUniversity = universityItems.slice(
    universityStartIndex,
    universityStartIndex + 4
  );
  const visibleLifeLesson = lifeLessonItems.slice(
    lifeLessonStartIndex,
    lifeLessonStartIndex + 4
  );

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

  const handleUniversityNext = () => {
    setUniversityStartIndex((prevIndex) => {
      const newIndex = prevIndex + 4;
      return newIndex >= universityItems.length ? 0 : newIndex;
    });
  };

  const handleUniversityPrev = () => {
    setUniversityStartIndex((prevIndex) => {
      const newIndex = prevIndex - 4;
      return newIndex < 0 ? Math.max(0, universityItems.length - 4) : newIndex;
    });
  };

  const handleLifeLessonNext = () => {
    setLifeLessonStartIndex((prevIndex) => {
      const newIndex = prevIndex + 4;
      return newIndex >= lifeLessonItems.length ? 0 : newIndex;
    });
  };

  const handleLifeLessonPrev = () => {
    setLifeLessonStartIndex((prevIndex) => {
      const newIndex = prevIndex - 4;
      return newIndex < 0 ? Math.max(0, lifeLessonItems.length - 4) : newIndex;
    });
  };

  // Your existing JSX (unchanged)
  return (
    <>
      <DesktopNavbar />
      <Background />
      <div className="main-books-main-wrapper">
        <h1 className="main-books-main-title">
          All you need at one place to be successful in your Student Life.
        </h1>
        {/* Search Bar */}
        <div className="main-books-search-container">
          <input
            type="text"
            placeholder="Search"
            className="main-books-search-input"
          />
          {/* Search Options */}
          <div className="main-books-search-options">
            <button className="main-books-option-button main-books-option-button-1">
              S1
            </button>
            <button className="main-books-option-button main-books-option-button-2">
              S2
            </button>
            <button className="main-books-option-button main-books-option-button-3">
              S3
            </button>
            <button className="main-books-option-button main-books-option-button-4">
              S4
            </button>
            <button className="main-books-option-button main-books-option-button-5">
              S5
            </button>
            <button className="main-books-option-button main-books-option-button-6">
              S6
            </button>
          </div>
        </div>

        {/* Ebooks Section */}
        <div className="eBooks-section">
          <h2 className="main-books-section-title-notes">E-Books</h2>
          <div className="main-eBooks-arrows-and-items">
            <button className="nav-arrow left-arrow" onClick={handlePrev}>
              <IoChevronBack />
            </button>
            <div className="eBooks-content">
              {visibleBooks.map((book, index) => (
                <div key={index} className="eBooks-item-section">
                  <div className="eBooks-item">
                    <img src={ForYou} alt={book.title} className="eBooks-image" />
                    <div className="eBooks-details">
                      <h3 className="eBooks-title">{book.title}</h3>
                      <p className="eBooks-price">
                        Price-{book.price} Rent-{book.rent}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="main-books-nav-arrow main-books-right-arrow"
              onClick={handleNext}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        {/* Notes Section */}
        <div className="main-books-notes-section">
          <h2 className="main-books-section-title-notes">Notes</h2>
          <div className="main-books-notes-content">
            <button className="nav-arrow left-arrow" onClick={handleNotesPrev}>
              <IoChevronBack />
            </button>
            {visibleNotes.map((note, index) => (
              <div className="main-books-notes-item-section">
                <div key={index}>
                  <div className="main-books-notes-item">
                    <img
                      src={ForYou}
                      alt={note.title}
                      className="main-books-notes-image"
                    />
                  </div>
                  <div className="main-books-notes-details">
                    <h3 className="main-books-notes-title">{note.title}</h3>
                    <p className="main-books-notes-price">
                      Price-{note.price} Rent-{note.rent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="main-books-nav-arrow main-books-right-arrow"
              onClick={handleNotesNext}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        {/* Preferred by top Universities */}
        <div className="main-books-university-section">
          <h2 className="main-books-section-title-university">
            Preferred by top Universities
          </h2>
          <div className="main-books-university-content">
            <button
              className="nav-arrow left-arrow"
              onClick={handleUniversityPrev}
            >
              <IoChevronBack />
            </button>
            {visibleUniversity.map((note, index) => (
              <div className="main-books-university-item-section">
                <div key={index}>
                  <div className="main-books-university-item">
                    <img
                      src={ForYou}
                      alt={note.title}
                      className="main-books-university-image"
                    />
                  </div>
                  <div className="main-books-university-details">
                    <h3 className="main-books-university-title">{note.title}</h3>
                    <p className="main-books-university-price">
                      Price-{note.price} Rent-{note.rent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="main-books-nav-arrow main-books-right-arrow"
              onClick={handleUniversityNext}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        {/* LIFE LESSON */}
        <div className="main-books-lifeLesson-section">
          <h2 className="main-books-section-title-lifeLesson">Life Lesson</h2>
          <div className="main-books-lifeLesson-content">
            <button
              className="main-books-nav-arrow main-books-left-arrow"
              onClick={handleLifeLessonPrev}
            >
              <IoChevronBack />
            </button>
            {visibleLifeLesson.map((university, index) => (
              <div className="main-books-lifeLesson-item-section">
                <div key={index}>
                  <div className="main-books-lifeLesson-item">
                    <img
                      src={ForYou}
                      alt={university.title}
                      className="main-books-lifeLesson-image"
                    />
                  </div>
                  <div className="main-books-lifeLesson-details">
                    <h3 className="main-books-lifeLesson-title">
                      {university.title}
                    </h3>
                    <p className="main-books-lifeLesson-price">
                      Price-{university.price} Rent-{university.rent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="main-books-nav-arrow main-books-right-arrow"
              onClick={handleLifeLessonNext}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="mobile-section-view-parent">
        <div className="mobile-main-books-main-wrapper">
          <div className="mobile-main-books-parent">
            <div className="mobile-books-main-heading">
              <IoArrowBackCircleOutline className="mobile-books-backIcon" />
              <h1 className="mobile-main-books-main-title">
                All you need at one place to be successful in your Student Life.
              </h1>
            </div>
            {/* Search Bar */}
            <div className="mobile-main-books-search-container">
              <input
                type="text"
                placeholder="Search"
                className="mobile-main-books-search-input"
              />
              {/* Search Options */}
              <div className="mobile-main-books-search-options">
                <button className="mobile-main-books-option-button main-books-option-button-1">
                  S1
                </button>
                <button className="mobile-main-books-option-button main-books-option-button-2">
                  S2
                </button>
                <button className="mobile-main-books-option-button main-books-option-button-3">
                  S3
                </button>
                <button className="mobile-main-books-option-button main-books-option-button-4">
                  S4
                </button>
                <button className="mobile-main-books-option-button main-books-option-button-5">
                  S5
                </button>
                <button className="mobile-main-books-option-button main-books-option-button-6">
                  S6
                </button>
              </div>
            </div>

            {/* Ebooks Section */}
            <div className="mobile-eBooks-section">
              <h2 className="mobile-main-books-section-title-notes">Ebooks</h2>
              <div className="mobile-eBooks-content">
                <div className="mobile-eBooks-items-list">
                  {visibleBooks.map((book, index) => (
                    <div key={index}>
                      <div className="mobile-eBooks-item">
                        <img
                          src={ForYou}
                          alt={book.title}
                          className="mobile-eBooks-image"
                        />
                      </div>
                      <div className="mobile-eBooks-details">
                        <h3 className="mobile-eBooks-title">{book.title}</h3>
                        <p className="mobile-eBooks-price">
                          Price-{book.price} Rent-{book.rent}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mobile-main-books-notes-section">
              <h2 className="mobile-main-books-section-title-notes">Notes</h2>
              <div className="mobile-main-books-notes-content">
                {visibleNotes.map((note, index) => (
                  <div key={index}>
                    <div className="mobile-main-books-notes-item">
                      <img
                        src={ForYou}
                        alt={note.title}
                        className="mobile-main-books-notes-image"
                      />
                    </div>
                    <div className="mobile-main-books-notes-details">
                      <h3 className="mobile-main-books-notes-title">
                        {note.title}
                      </h3>
                      <p className="mobile-main-books-notes-price">
                        Price-{note.price} Rent-{note.rent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferred by top Universities */}
            <div className="mobile-main-books-university-section">
              <h2 className="mobile-main-books-section-title-university">
                Preferred by top Universities
              </h2>
              <div className="mobile-main-books-university-content">
                {visibleUniversity.map((note, index) => (
                  <div className="mobile-main-books-university-item-section">
                    <div key={index}>
                      <div className="mobile-main-books-university-item">
                        <img
                          src={ForYou}
                          alt={note.title}
                          className="mobile-main-books-university-image"
                        />
                      </div>
                      <div className="mobile-main-books-university-details">
                        <h3 className="mobile-main-books-university-title">
                          {note.title}
                        </h3>
                        <p className="mobile-main-books-university-price">
                          Price-{note.price} Rent-{note.rent}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LIFE LESSON */}
            <div className="mobile-main-books-lifeLesson-section">
              <h2 className="mobile-main-books-section-title-lifeLesson">
                Life Lesson
              </h2>
              <div className="mobile-main-books-lifeLesson-content">
                {visibleLifeLesson.map((university, index) => (
                  <div className="mobile-main-books-lifeLesson-item-section">
                    <div key={index}>
                      <div className="mobile-main-books-lifeLesson-item">
                        <img
                          src={ForYou}
                          alt={university.title}
                          className="mobile-main-books-lifeLesson-image"
                        />
                      </div>
                      <div className="mobile-main-books-lifeLesson-details">
                        <h3 className="mobile-main-books-lifeLesson-title">
                          {university.title}
                        </h3>
                        <p className="mobile-main-books-lifeLesson-price">
                          Price-{university.price} Rent-{university.rent}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;