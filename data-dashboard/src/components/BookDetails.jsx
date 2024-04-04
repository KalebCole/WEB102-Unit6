import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const URL = "https://openLibrary.org/works/";

const BookDetails = () => {
    const {id} = useParams();
    const [book, setBook] = useState(null);
    // console.log(id)
    useEffect(() => {
        async function getBookDetails(){
            try{
                const response = await fetch(`${URL}${id}.json`)
                const data = await response.json();

                if(data){
                    const {description, title, covers, subject_places, subject_times, subjects} = data;
                    const newBook = {
                        description : description ? description.value : "No description found", title: title, cover_img: covers ? `https://covers.openlibrary.org/b/id${covers[0]}-L.jpg` : null,
                        subject_places: subject_places ? subject_places.join(",") : "No subject places found",
                        subjects : subjects ? subjects.join(", ") : "No subjects found"
                    };
                    setBook(newBook);
                }
            }
            catch(error){
                console.log(error)
            }
        }
        getBookDetails()
    }, [id])

    return(
        <>
        <div>BookDetails</div>
        <p>Title: {book.title}</p>
        <p>Description: {book.description}</p>
        <p>Subject Places: {book.subject_places}</p>
        <p>Subjects: {book.subjects}</p>
        
        </>
    )
}

export default BookDetails;