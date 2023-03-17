import { useState } from 'react';
import './SearchBar.css';
import axios from 'axios';

function SearchBar (){

    const options = {/* options */};
    let url = "https://raw.githubusercontent.com/ManishLapasi/react-spotify/main/src/components/names_ids.csv";
    let data = []
    axios.get(url)
        .then(function (response) {
            console.log(response)
            data = response.data.split("\n");
        })

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