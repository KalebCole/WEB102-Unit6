export default function BookList({books}){
    return(
        <div className="book-list">
            {books.docs.map((book, index) => {
                return(
                    <div key={index} className="book">
                        <h3>{book.title}</h3>
                        <p>{book.author_name}</p>
                        <p>{book.first_publish_year}</p>
                        <p>{book.subject}</p>
                    </div>
                )
            })}
        </div>
    )
};