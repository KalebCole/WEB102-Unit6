import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import placeholderImage from '../assets/book-cover-placeholder.gif';
import "./BooksList.css";

export default function BookList({ books }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); // Assuming books prop is managed in App.jsx and updated asynchronously
  }, [books]);
  if (isLoading) {
    return <div className="loading">Loading books...</div>;
  }
  else{
    return (
      <div className="book-list">
        {books.map(({ id, cover_id, title, author, rating }) => {
          let bookId = id.replace("/works/", "");
          
          return (
            <div key={id} className="book">
              <img 
                src={cover_id ? `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg` : placeholderImage} 
                alt={`Cover of the book "${title}"`} 
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
              />
              <h3>{title}</h3>
              <p>by {Array.isArray(author) ? author.join(", ") : author || "Unknown"}</p>
              <p>Avg Rating: {rating || 'N/A'}</p>
              <Link to={`/book/${bookId}`}>Details</Link>
            </div>
          );
        })}
      </div>
    );
  }
}
