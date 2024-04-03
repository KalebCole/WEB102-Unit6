import { CiSearch } from "react-icons/ci";

export default function SearchBar({searchString, setSearchString}){
    return(
        <div className="search-bar">
            <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Search for a book..." />
            <button><CiSearch /> Search</button>
        </div>
    );
}