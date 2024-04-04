import { Link } from 'react-router-dom';

export default function BookList({ books }) {
  return (
    <div className="book-list">
      {books.map(({ id, title, author, ratings_average }) => {
        return (
          <div key={id} className="book">
            <h3>{title}</h3>
            {/* Handle cases where author might be undefined or an array */}
            <p>by {Array.isArray(author) ? author.join(", ") : author || "Unknown"}</p>
            {/* Check if ratings_average exists; if not, display 'N/A' */}
            <p>Avg Rating: {ratings_average || 'N/A'}</p>
            <Link to={`/book/${id}`}>Details</Link>
          </div>
        );
      })}
    </div>
  );
}
