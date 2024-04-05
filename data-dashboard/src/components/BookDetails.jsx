import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import placeholderImage from '../assets/book-cover-placeholder.gif';
import "./BookDetails.css"

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        async function getBookDetails() {
            try {
                const response = await fetch(`${URL}${id}.json`);
                const data = await response.json();

                if (data) {
                    const {
                        description,
                        title,
                        covers,
                        subject_places,
                        subject_times,
                        subjects
                    } = data;
                    const newBook = {
                        title: title,
                        description: description?.value || description || "No description found",
                        cover_img: covers && covers.length > 0 ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : placeholderImage,
                        subject_places: subject_places?.join(", ") || "No subject places found",
                        subject_times: subject_times?.join(", ") || "No subject times found",
                        subjects: subjects?.join(", ") || "No subjects found"
                    };
                    setBook(newBook);
                }
            } catch (error) {
                console.error(error);
                setBook(null); // Ensure book state is reset on error
            }
        }
        getBookDetails();
    }, [id]);

    if (!book) return <div>Loading...</div>; // Display loading or handle null state

    return (
        <div className="book-details">
            <div className="book-cover" style={{ backgroundImage: `url(${book.cover_img})` }}>
                <div className="overlay">
                    <h1 className="book-title">{book.title}</h1>
                    <p className="book-tagline">{/* Some catchy tagline or quote here */}</p>
                </div>
            </div>
            <div className="book-content">
                <p>Description: {book.description}</p>
                <p>Subject Places: {book.subject_places}</p>
                <p>Subjects: {book.subjects}</p>
                <p>Subject Times: {book.subject_times}</p>
            </div>
        </div>
    );
};

export default BookDetails;
