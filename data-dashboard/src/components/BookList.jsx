import { Link } from 'react-router-dom';
import "./BooksList.css"
// https://covers.openlibrary.org/b/id/240727-S.jpg

export default function BookList({ books }) {
  return (
    <div className="book-list">
      {books.map(({ id, cover_id, title, author, rating }) => {
        let bookId = id.replace("/works/", "");
        // console.log(rating)
        return (
          <div key={id} className="book">
            <img src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`} alt="" />
            <h3>{title}</h3>
            {/* Handle cases where author might be undefined or an array */}
            <p>by {Array.isArray(author) ? author.join(", ") : author || "Unknown"}</p>
            {/* Check if rating exists; if not, display 'N/A' */}
            <p>Avg Rating: {rating || 'N/A'}</p>
            <Link to={`/book/${bookId}`}>Details</Link>
          </div>
        );
      })}
    </div>
  );
}
