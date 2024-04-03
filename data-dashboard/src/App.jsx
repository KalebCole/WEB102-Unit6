import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./App.css";
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import StatChart from "./components/StatChart";
import BookList from "./components/BookList";



export default function App() {
  
  const [books, setBooks] = useState([]);
  const [searchString, setSearchString] = useState('lord of the rings');
  const[filters, setFilters] = useState(
    {
      "rating" : null,
      "subjects" : [],
      "availableOnAudio": false,
      "languages": []
    }
  )
  console.log(filters.rating)

  const URL = "https://openlibrary.org/search.json?"
  useEffect(() => {
    async function fetchData() {
      // call API
      const urlSlug = searchString.replace(" ", "+")
      try {
        const response = await axios.get(URL + "title=" + urlSlug);
        setBooks(response.data);
      } catch (error) {
        console.log("no data")
      }
    }
    fetchData();
  }, [searchString]);

  // const filterBySearch = searchString.length > 0 ? books : books.filter((book) => {
  //   return book.title.toLowerCase().includes(searchString.toLowerCase());
  // });

  // const filterByRating = filters.rating ? filterBySearch.filter((book) => {
  //   return book.ratings_average >+ filters.rating;
  // }) : filterBySearch;

  // const filterBySubjects = filters.subjects.length > 0 ? filterByRating.filter((book) => {
  //   return filters.subjects.includes(book.subject);
  // }) : filterByRating;

  // const filterByAvailableOnAudio = filters.availableOnAudio ? filterBySubjects.filter((book) => {
  //   return book.availableOnAudio === filters.availableOnAudio;
  // }) : filterBySubjects;

  // const filterByLanguages = filters.languages.length > 0 ? filterByAvailableOnAudio.filter((book) => {
  //   return filters.languages.includes(book.language);
  // }) : filterByAvailableOnAudio;
  const filteredBooks = useMemo(() => books && books.docs && books.docs.filter(book => {
    const matchesSearch = searchString.length === 0 || book.title.toLowerCase().includes(searchString.toLowerCase());
    const matchesRating = !filters.rating || book.ratings_average >= filters.rating;
    const matchesSubjects = filters.subjects.length === 0 || filters.subjects.includes(book.subject);
    const matchesAudio = !filters.availableOnAudio || book.availableOnAudio === filters.availableOnAudio;
    const matchesLanguages = filters.languages.length === 0 || filters.languages.includes(book.language);
    
    return matchesSearch && matchesRating && matchesSubjects && matchesAudio && matchesLanguages;
  }), [books, searchString, filters]);
  

  return(
    <>
      {/* {console.log(books.docs[0])} */}
      {/* <Navbar/> */}
      <Heading/>
      <SearchBar searchString = {searchString} setSearchString={setSearchString}/>
      <Filters rating = {filters.rating} subjects = {filters.subjects} availableOnAudio = {filters.availableOnAudio} languages = {filters.languages} setFilters = {setFilters}/>
      {/* <StatChart books={books}/> */}
      {books && books.docs && books.docs.length > 0 && <BookList books = {books}/> }
    </>
  );
}
