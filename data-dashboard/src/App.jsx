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

function About() {
  return <h1>About</h1>;
}

export default function App() {
  const [books, setBooks] = useState([]);
  const [searchString, setSearchString] = useState("lord of the rings");
  const [filters, setFilters] = useState({
    rating: null,
    subjects: [],
    availableOnAudio: false,
    languages: [],
  });

  const URL = "https://openlibrary.org/search.json?";
  useEffect(() => {
    async function fetchData() {
      // call API
      const urlSlug = searchString.replaceAll(" ", "+");
      // console.log(URL + "title=" + urlSlug);
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
              availableOnAudio,
              subject,
              language,
              first_publish_year,
              title,
            } = book;
            let audioAvailability = availableOnAudio > 0 ? true : false;
            return {
              id: key,
              author: author_name,
              cover_id: cover_i,
              edition_count: edition_count,
              isAvailableOnAudio: audioAvailability,
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
    }
    fetchData();
  }, [searchString]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesRating = filters.rating ? book.rating >= filters.rating : true;
      const matchesSubjects = filters.subjects ? filters.subjects.every(subject => book.subjects.includes(subject)) : true;
      const matchesAudioAvailability = !filters.availableOnAudio || (book.isAvailableOnAudio === filters.availableOnAudio);
      const matchesLanguages = filters.languages ? filters.languages.every(language => book.languages.includes(language)) : true;
      return matchesRating && matchesSubjects && matchesAudioAvailability && matchesLanguages;
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
                languages={filters.languages}
                setFilters={setFilters}
              />
              <StatChart books={books} />
              {books && (
                <BookList books={books} />
              )}
            </>
          }
        />
        <Route path="/about" element={<>{<About />}</>} />
        <Route path="/book/:id" Component={BookDetails} />
      </Routes>
    </>
  );
}
