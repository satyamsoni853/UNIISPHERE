import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Books.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoArrowBackCircleOutline, IoChevronBack } from "react-icons/io5";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import Background from "../Background/Background";

const Books = () => {
  // State for API books, loading, and error
  const [apiBooks, setApiBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Retrieve token and userId from localStorage
        const token =
          localStorage.getItem("token") || localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        // Log all localStorage contents for debugging
        console.log("LocalStorage Contents:", {
          token,
          userId,
          allItems: Object.entries(localStorage),
        });

        if (!token || !userId) {
          console.warn("Token or userId not found in localStorage");
          setError("Authentication details missing. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://uniisphere-backend-latest.onrender.com/api/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: { userId },
            timeout: 10000,
          }
        );

        // Log the full API response
        console.log("API Response:", {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });

        // Handle different response structures
        const bookData = response.data.data || response.data || [];
        if (!Array.isArray(bookData)) {
          throw new Error("API response is not an array of books");
        }

        // Transform API response
        const transformedBooks = bookData.map((book) => {
          const imageUrl = book.url || "https://via.placeholder.com/150";
          console.log(`Book Image URL: ${imageUrl}`); // Debug image URLs
          return {
            title: book.name || "Untitled Book",
            url: imageUrl,
          };
        });

        setApiBooks(transformedBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
        setError("Failed to load books. Please try again later.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Click handler for e-books
  const handleBookClick = (book) => {
    console.log("Selected Book:", {
      name: book.title,
      url: book.url,
    });
    window.open(book.url, "_blank");
  };

  // State for carousel navigation
  const [startIndex, setStartIndex] = useState(0);

  // Data slicing for display
  const visibleBooks = apiBooks.slice(startIndex, startIndex + 4);

  const handleNext = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + 4;
      return newIndex >= apiBooks.length ? 0 : newIndex;
    });
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - 4;
      return newIndex < 0 ? Math.max(0, apiBooks.length - 4) : newIndex;
    });
  };

  // JSX
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
        <div className="main-books-eBooks-section">
          <h2 className="main-books-section-title-eBooks">Ebooks</h2>
          <div className="main-books-eBooks-content">
            <button className="nav-arrow left-arrow" onClick={handlePrev}>
              <IoChevronBack className="Forword-backword-book-btn" />
            </button>
            {loading ? (
              <p>Loading books...</p>
            ) : error ? (
              <p>{error}</p>
            ) : visibleBooks.length > 0 ? (
              visibleBooks.map((book, index) => (
                <div
                  className="eBooks-item-section"
                  key={index}
                  onClick={() => handleBookClick(book)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="eBooks-item">
                    <img
                      // src={book.url}
                      // alt={book.title}
                      className="eBooks-image"
                      onError={(e) => {
                        // console.warn(`Failed to load image: ${book.url}`);
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                    <div className="eBooks-details">
                      <h3 className="eBooks-title">{book.title}</h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No books available</p>
            )}
            <button
              className="main-books-nav-arrow main-books-right-arrow"
              onClick={handleNext}
            >
              <IoIosArrowForward className="Forword-backword-book-btn" />
            </button>
          </div>
        </div>

        {/* Notes Section */}
        <div className="main-books-notes-section">
          <h2 className="main-books-section-title-notes">Notes</h2>
          <div className="main-books-notes-content">
            <p>Coming Soon</p>
          </div>
        </div>

        {/* Preferred by top Universities */}
        <div className="main-books-university-section">
          <h2 className="main-books-section-title-university">
            Preferred by top Universities
          </h2>
          <div className="main-books-university-content">
            <p>Coming Soon</p>
          </div>
        </div>

        {/* Life Lesson */}
        <div className="main-books-lifeLesson-section">
          <h2 className="main-books-section-title-lifeLesson">Life Lesson</h2>
          <div className="main-books-lifeLesson-content">
            <p>Coming Soon</p>
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
                  {loading ? (
                    <p>Loading books...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : visibleBooks.length > 0 ? (
                    visibleBooks.map((book, index) => (
                      <div
                        key={index}
                        onClick={() => handleBookClick(book)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="mobile-eBooks-item">
                          <img
                            src={book.url}
                            alt={book.title}
                            className="mobile-eBooks-image"
                            onError={(e) => {
                              console.warn(`Failed to load image: ${book.url}`);
                              e.target.src = "https://via.placeholder.com/150";
                            }}
                          />
                        </div>
                        <div className="mobile-eBooks-details">
                          <h3 className="mobile-eBooks-title">{book.title}</h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No books available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mobile-main-books-notes-section">
              <h2 className="mobile-main-books-section-title-notes">Notes</h2>
              <div className="mobile-main-books-notes-content">
                <p>Coming Soon</p>
              </div>
            </div>

            {/* Preferred by top Universities */}
            <div className="mobile-main-books-university-section">
              <h2 className="mobile-main-books-section-title-university">
                Preferred by top Universities
              </h2>
              <div className="mobile-main-books-university-content">
                <p>Coming Soon</p>
              </div>
            </div>

            {/* Life Lesson */}
            <div className="mobile-main-books-lifeLesson-section">
              <h2 className="mobile-main-books-section-title-lifeLesson">
                Life Lesson
              </h2>
              <div className="main-books-lifeLesson-content">
                <p>Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;