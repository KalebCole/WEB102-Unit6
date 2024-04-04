import {useState} from 'react'
import "./Filters.css"

export default function Filters({
  rating,
  subjects,
  availableOnAudio,
  languages,
  setFilters,
}) {

  const [toggled, setToggled] = useState(false);
  return (
    <div className="container">
      {/* rating section */}
      <div className="rating-section">
        {/* when the rating is not null, display a clear button */}
        <ul>
          {[1, 2, 3, 4, 5].map((rating) => (
            <li
            key={rating}
            onClick={() =>
              setFilters((prevFilters) => ({ ...prevFilters, rating }))
            }
            >
              {rating}
            </li>
          ))}
        </ul>
      </div>

      {/* subjects section */}
      <div className="subjects-section">
          {/* when the subject is not null, display a clear button */}
          <ul>
            {subjects.map((subject) => (
              <li key={subject} onClick={() => setFilters((prevFilters) => ({ ...prevFilters, subject }))}>
                {subject}
              </li>
            ))}
          </ul>
        </div>

      {/* availableOnAudio Section */}
      <div className="audio-section">
        {/* toggle switch for the audio content */}
        <button className={`toggle-btn ${toggled ? "toggled"  : null}`} onClick={() => setToggled(!toggled)}></button>
      </div>

      <div className="languages-section">
        <ul>
          {languages.map((language) => (
            <li key={language} onClick={() => setFilters((prevFilters) => ({ ...prevFilters, language }))}>
              {language}
            </li>
          ))}
        </ul>
        {/* check box for the languages available */}
      </div>
    </div>
  );
}
