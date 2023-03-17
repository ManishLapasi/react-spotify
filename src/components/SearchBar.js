import { useState } from 'react';
import './SearchBar.css';
import axios from 'axios';

function SearchBar (){

    let url = "https://raw.githubusercontent.com/ManishLapasi/react-spotify/main/src/components/names_ids.csv";
    let songlist = []

    axios.get(url)
        .then(function (response) {
            let data = response.data.split("\n");
            for (let i=0; i<data.length;i++) {
                let [id, ...name] = data[i].split(",");
                let trackname = name.join(",");
                songlist.push({id:id, name:trackname});
            }
        })    


    const [song, setSong] = useState('');
    const [filteredlist, setFilteredList] = useState([]);

    const handleSearch = (event) => {
        let val = event.target.value.toLowerCase();
        //console.log("searching", event.target.value);
        let searchedList = [];
        for (let i in songlist) {
            if (songlist[i].name.toLowerCase().includes(val)){searchedList.push(songlist[i])}
            if (searchedList.length>99) {break;}
        }
        //console.log(searchedList);
        setFilteredList(searchedList);
    }

    const handleSelect = (event) => {
        setSong(event.target.value);
    }


    return (
        <div className="searchbar">
            <input type="text" placeholder="Search for a song!" onChange={handleSearch}/>
            <select onChange={handleSelect}>
                {filteredlist.map((ele) => (
                    <option key={ele.id} value={ele.id}>
                        {ele.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SearchBar;