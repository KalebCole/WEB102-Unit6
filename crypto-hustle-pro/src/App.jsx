import { useEffect, useState } from "react";
import CoinInfo from "./components/CoinInfo";
import CoinList from "./components/CoinList";

import "./App.css";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchAllCoinsData = async () => {
      fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY
      )
        .then((response) => response.json())
        .then((data) => {
          setList(data);
          console.log(list.Data);
        });
    };
    fetchAllCoinsData().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <CoinList list={list} searchInput={searchInput} filteredResults={filteredResults} />

      </div>
    </>
  );
}

export default App;
