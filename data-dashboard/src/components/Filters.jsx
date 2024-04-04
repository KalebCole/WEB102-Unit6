/* eslint-disable react/prop-types */
import React from 'react';
import './Filters.css';

export default function Filters({
  rating,
  subjects,
  availableOnAudio,
  languages,
  setFilters,
}) {
  // Function to handle adding or removing a subject from the filters
  const toggleSubject = (subject) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      subjects: prevFilters.subjects.includes(subject)
        ? prevFilters.subjects.filter((s) => s !== subject) // Remove subject
        : [...prevFilters.subjects, subject], // Add subject
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
      [filterName]: filterName === 'subjects' || filterName === 'languages' ? [] : null,
    }));
  };

  return (
    <div className="container">
      {/* Rating section */}
      <div className="rating-section">
        <ul>
          {[1, 2, 3, 4, 5].map((r) => (
            <li
              key={r}
              className={`rating-item ${rating === r ? 'selected' : ''}`}
              onClick={() =>
                setFilters((prevFilters) => ({ ...prevFilters, rating: r }))
              }
            >
              {r} Stars
            </li>
          ))}
        </ul>
        {rating && (
          <button className="clear-btn" onClick={() => clearFilter('rating')}>
            Clear Rating
          </button>
        )}
      </div>

      {/* Subjects section */}
      <div className="subjects-section">
        <ul>
          {subjects.map((subject) => (
            <li
              key={subject}
              className={`subject-item ${subjects.includes(subject) ? 'selected' : ''}`}
              onClick={() => toggleSubject(subject)}
            >
              {subject}
            </li>
          ))}
        </ul>
        {subjects.length > 0 && (
          <button className="clear-btn" onClick={() => clearFilter('subjects')}>
            Clear Subjects
          </button>
        )}
      </div>

      {/* AvailableOnAudio Section */}
      <div className="audio-section">
        <label className="toggle-label">
          Available on Audio
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
          <span className="toggle-btn"></span>
        </label>
      </div>

      {/* Languages section */}
      <div className="languages-section">
        <ul>
          {languages.map((language) => (
            <li
              key={language}
              className={`language-item ${languages.includes(language) ? 'selected' : ''}`}
              onClick={() => toggleLanguage(language)}
            >
              {language}
            </li>
          ))}
        </ul>
        {languages.length > 0 && (
          <button className="clear-btn" onClick={() => clearFilter('languages')}>
            Clear Languages
          </button>
        )}
      </div>
    </div>
  );
}
