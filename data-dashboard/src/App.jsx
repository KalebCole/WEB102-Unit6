import { useEffect, useState } from "react";
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

  return(
    <>
      {/* {console.log(books.docs[0])} */}
      {/* <Navbar/> */}
      <Heading/>
      {/* <SearchBar searchString = {searchString}/> */}
      {/* <Filters rating = {filters.rating} subjects = {filters.subjects} availableOnAudio = {filters.availableOnAudio} languages = {filters.languages}/>
      <StatChart books={books}/>
      <BookList books = {books}/> */}
    </>
  );
}
