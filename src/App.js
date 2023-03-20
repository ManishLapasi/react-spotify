import React from 'react';
import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Switch from './components/Switch';
import SubmitButton from './components/SubmitButton';
import Padder from './components/Padder';
import DisplaySongs from './components/DisplaySongs';
import axios from 'axios';

function App() {

    let url = process.env.REACT_APP_SONGLISTURL;
    let searchurl = process.env.REACT_APP_AWS_LAMBDA_FUNCTION_URL;
    let songlist = []
    let id2namesList = {}

    axios.get(url)
        .then(function (response) {
            let data = response.data.split("\n");
            for (let i=0; i<data.length;i++) {
                let [id, ...name] = data[i].split(",");
                let trackname = name.join(",");
                songlist.push({id:id, name:trackname});
                id2namesList[id] = trackname;
            }
        })
    
    const [song, setSong] = useState('');
    const [closestSongs, setClosestSongs] = useState([])

    const handleOnSubmit = () => {
      console.log("searching for song with id",song);
      axios.get(searchurl+song)
        .then(function (response) {
            console.log(response);
            setClosestSongs(response);
        });
    }
    
    return (
      <div className="App">
        <div className='topbar'>
          <SearchBar songs={songlist} id2names={id2namesList} setSong={setSong}></SearchBar>
          <Padder></Padder>
          <Switch></Switch>
          <Padder></Padder>
          <SubmitButton onClick={handleOnSubmit}></SubmitButton>
        </div>
        <DisplaySongs closestSongs={closestSongs}></DisplaySongs>
      </div>
    );
}

export default App;
