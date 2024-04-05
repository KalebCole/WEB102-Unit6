import { CiSearch } from "react-icons/ci";
import "./SearchBar.css"
export default function SearchBar({ searchString, setSearchString }) {
  return (
    <div className="search-bar">
      <CiSearch />
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Search for a book..."
      />
    </div>
  );
}
