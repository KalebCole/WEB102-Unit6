/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./Filters.css";
import StarRatings from 'react-star-ratings';

export default function Filters({
  rating,
  subjects,
  availableOnAudio,
  languages,
  setFilters,
  books,
}) {
  // onLoad, populate a list of 15 subjects from the first 2 subjects in the books subject array and add this to the subjects filter
  const [bookSubjects, setBookSubjects] = useState([]);
  const populateSubjects = () => {
    if (!books || books.length === 0) {
      setBookSubjects([]);
      return;
    }
  
    const newBookSubjects = [];
    books.forEach((book) => {
      if (book.subjects && Array.isArray(book.subjects)) {
        for (let i = 0; i < book.subjects.length && i < 2; i++) {
          newBookSubjects.push(book.subjects[i]);
        }
      }
    });
  
    // Deduplicate subjects
    const uniqueSubjects = Array.from(new Set(newBookSubjects));
  
    // Limit to 15 subjects
    setBookSubjects(uniqueSubjects.slice(0, 15));
  };
  

  useEffect(() => {
    populateSubjects();
  }, [books]);
  
 // Toggle subject selection
 const handleSubjectChange = (subject) => {
  setFilters(prevFilters => {
    const isSubjectSelected = prevFilters.subjects.includes(subject);
    if (isSubjectSelected) {
      return { ...prevFilters, subjects: prevFilters.subjects.filter(s => s !== subject) };
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
  // Function to handle adding or removing a language from the filters
  const toggleLanguage = (language) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      languages: prevFilters.languages.includes(language)
        ? prevFilters.languages.filter((l) => l !== language) // Remove language
        : [...prevFilters.languages, language], // Add language
    }));
  };

  // Function to clear a specific filter
  const clearFilter = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]:
        filterName === "subjects" || filterName === "languages" ? [] : null,
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
          name='rating'
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
            onChange={() => setFilters((prevFilters) => ({
              ...prevFilters,
              availableOnAudio: !prevFilters.availableOnAudio,
            }))}
          />
          Available on Audio
        </label>
      </div>

      <div className="filter-group languages-filter">
        <h4>Languages</h4>
        {languages.map((language) => (
          <div key={language} className="checkbox-container">
            <input
              id={`language-${language}`}
              type="checkbox"
              checked={languages.includes(language)}
              onChange={() => toggleLanguage(language)}
            />
            <label htmlFor={`language-${language}`}>{language}</label>
          </div>
        ))}
        {languages.length > 0 && (
          <button
            className="clear-btn"
            onClick={() => clearFilter("languages")}
          >
            Clear Languages
          </button>
        )}
      </div>
    </div>
  );
}