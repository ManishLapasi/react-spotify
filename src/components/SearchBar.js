import { useState } from 'react';
import './SearchBar.css';
import "./songlist";

function SearchBar (){

    console.log(songarr[0]);

    const [song, setSong] = useState('');

    const handleClick = () => {
        console.log(song);
    }

    const handleSearch = () => {
        console.log("searching");
    }


    return (
        <div className="searchbar">
            <input type="text" placeholder="Search for a song!" value={song} onChange={handleSearch}/>
            <button type='submit' onClick={handleClick}></button>
        </div>
    );
}

export default SearchBar;