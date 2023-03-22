import { useState, useRef } from 'react';
import './SearchBar.css';
import React from 'react';

function SearchBar (props){

    let [songlist, id2namesList, setSong] = [props.songs, props.id2names, props.setSong];
    //console.log(songlist);

    const [inputVal, setInputVal] = useState('');
    const [filteredlist, setFilteredList] = useState([]);


    const getsonglist = (val) => {
        let searchedList = [];
        //console.log("searching for ",val);
        for (let i in songlist) {
            if (songlist[i].name.toLowerCase().includes(val)){searchedList.push(songlist[i]);}
            if (searchedList.length>99) {break;}
        }
        return Promise.resolve(searchedList);
    }

    const handleSearch = (event) => {
        setInputVal(event.target.value);
        let val = event.target.value.toLowerCase();
        if (val.length < 3) {
            setIsOpen(false);
            document.getElementById("ddlist").classList.add("hidden");
            return;
        }
        
        getsonglist(val).then(
            (ans) => {
                document.getElementById("ddlist").classList.remove("hidden");
                setIsOpen(true);
                setFilteredList(ans);
                //console.log(isOpen, filteredlist);
            }
        )

    }

    const handleSelect = (event) => {
        let [selected_song_id, selected_song_name] = [event.target.value, id2namesList[event.target.value]]
        console.log("selected ", selected_song_id, selected_song_name);
        setSong(selected_song_id);
        setIsOpen(false);
        setInputVal(selected_song_name);
        document.getElementById("ddlist").classList.add("hidden");
    }

    const [isOpen, setIsOpen] = useState(false); 
    const menuRef = useRef(null);
    /*
    const [listening, setListening] = useState(false); 
    useEffect(listenForOutsideClicks(listening, setListening, menuRef, setIsOpen));
    */

    return (
        <div className="searchbar">
            <input type="text" placeholder='Search for a song!' onChange={handleSearch} value={inputVal}/>
            <div ref={menuRef} className='dropdownlist hidden' id='ddlist'>
                {isOpen ? (
                    <div>
                        {filteredlist.map((ele) => (
                        <option key={ele.id} value={ele.id} onClick={handleSelect}>
                            {ele.name}
                        </option>
                    ))}
                    </div>) : (' ')
                }
            </div>
        </div>
    );
}

export default SearchBar;