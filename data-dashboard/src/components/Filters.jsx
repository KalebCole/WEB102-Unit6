/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./Filters.css";
import StarRatings from "react-star-ratings";

export default function Filters({
  rating,
  subjects,
  availableOnAudio,
  setFilters,
  books,
}) {
  // onLoad, populate a list of 15 subjects from the first 2 subjects in the books subject array and add this to the subjects filter
  const [bookSubjects, setBookSubjects] = useState([]);
  const populateSubjects = () => {
    const commonBookSubjects = [
      "Fiction",
      "Non-Fiction",
      "Science Fiction & Fantasy",
      "Biographies & Memoirs",
      "Children's Books",
      "Self-Help",
      "History",
      "Business & Economics",
      "Science & Technology",
      "Health & Fitness",
    ];
    // Limit to 15 subjects
    setBookSubjects(commonBookSubjects);
  };

  useEffect(() => {
    populateSubjects();
  }, [books]);

  // Toggle subject selection
  const handleSubjectChange = (subject) => {
    setFilters((prevFilters) => {
      const isSubjectSelected = prevFilters.subjects.includes(subject);
      if (isSubjectSelected) {
        return {
          ...prevFilters,
          subjects: prevFilters.subjects.filter((s) => s !== subject),
        };
      } else {
        return { ...prevFilters, subjects: [...prevFilters.subjects, subject] };
      }
    });
  };

  // This function updates the filters state with the new rating
  const changeRating = (newRating) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: newRating,
    }));
  };
  // Function to clear a specific filter
  const clearFilter = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterName === "subjects" ? [] : null,
    }));
  };
  return (
    <div className="filters-container">
      <div className="filter-group subjects-filter">
        <h4>Subjects</h4>
        {bookSubjects.map((subject) => (
          <div key={subject} className="checkbox-container">
            <input
              id={`subject-${subject}`}
              type="checkbox"
              checked={subjects.includes(subject)}
              onChange={() => handleSubjectChange(subject)}
            />
            <label htmlFor={`subject-${subject}`}>{subject}</label>
          </div>
        ))}
        {bookSubjects.length > 0 && (
          <button className="clear-btn" onClick={() => clearFilter("subjects")}>
            Clear Subjects
          </button>
        )}
      </div>

      <div className="filter-group rating-filter">
        <h4>Rating</h4>
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          starHoverColor="gold"
          changeRating={changeRating}
          numberOfStars={5}
          name="rating"
        />
        {rating > 0 && (
          <button className="clear-btn" onClick={() => changeRating(0)}>
            Clear Rating
          </button>
        )}
      </div>

      <div className="filter-group audio-filter">
        <h4>Available on Audio</h4>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={availableOnAudio}
            onChange={() =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                availableOnAudio: !prevFilters.availableOnAudio,
              }))
            }
          />
        </label>
      </div>
    </div>
  );
}
