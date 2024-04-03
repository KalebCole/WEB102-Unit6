export default function BookList({books}){
    return(
        <div className="book-list">
            {books.docs.map((book, index) => {
                return(
                    // i will want to make this a flex box with a pagination that is responsive to mobile
                    <div key={index} className="book">
                        <h3>{book.title}</h3>
                        <p>by {book.author_name}</p>
                        {/* add a star icon */}
                        <p>Avg Rating: {book.ratings_average}</p>
                    </div>
                )
            })}
        </div>
    )
};