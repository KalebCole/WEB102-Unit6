import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./App.css";
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import StatChart from "./components/StatChart";
import BookList from "./components/BookList";
import { Routes, Route } from "react-router-dom";
import BookDetails from "./components/BookDetails";
import Fuse from "fuse.js"; // Make sure to install fuse.js or similar library

function About() {
  return <h1>About</h1>;
}

export default function App() {
  const [books, setBooks] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filters, setFilters] = useState({
    rating: 0,
    subjects: [],
    availableOnAudio: false,
  });
  const [isLoading, setIsLoading] = useState(false);


  const URL = "https://openlibrary.org/search.json?";
  useEffect(() => {
    async function fetchData() {
      // call API
      if (searchString.length === 0) {
        setBooks([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const urlSlug = searchString.replaceAll(" ", "+");
      try {
        const response = await axios.get(URL + "title=" + urlSlug);
        const { docs } = response.data;

        if (docs) {
          const newBooks = docs.slice(0, 25).map((book) => {
            const {
              key,
              author_name,
              cover_i,
              edition_count,
              ebook_count_i,
              ratings_average,
              subject,
              language,
              first_publish_year,
              title,
            } = book;
            let audioAvailability = ebook_count_i > 0 ? true : false;

            return {
              id: key,
              author: author_name,
              cover_id: cover_i,
              edition_count: edition_count,
              isAvailableOnAudio: audioAvailability,
              rating: ratings_average,
              subjects: subject,
              languages: language,
              first_publish_year: first_publish_year,
              title: title,
            };
          });
          setBooks(newBooks);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.log("no data");
      }
      setIsLoading(false);
    }
    fetchData();
  }, [searchString]);

  // console.log(filters.subjects)

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesRating = filters.rating ? book.rating >= filters.rating : true;
      
      // Filter subjects
      const matchesSubjects = filters.subjects.length > 0 
        ? book.subjects && filters.subjects.every(subject => book.subjects.includes(subject))
        : true;
  
      const matchesAudioAvailability = !filters.availableOnAudio || book.isAvailableOnAudio === filters.availableOnAudio;
  
      return matchesRating && matchesSubjects && matchesAudioAvailability;
    });
  }, [books, filters]);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Heading />
              <SearchBar
                searchString={searchString}
                setSearchString={setSearchString}
              />
              <Filters
                rating={filters.rating}
                subjects={filters.subjects}
                availableOnAudio={filters.availableOnAudio}
                setFilters={setFilters}
                books={filteredBooks}
              />
              <StatChart books={filteredBooks} />
              {filteredBooks && <BookList books={filteredBooks} />}
            </>
          }
        />
        <Route path="/about" element={<>{<About />}</>} />
        <Route path="/book/:id" Component={BookDetails} />
      </Routes>
    </>
  );
}
