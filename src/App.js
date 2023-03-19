import React from 'react';
import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Switch from './components/Switch';
import SubmitButton from './components/SubmitButton';
import Padder from './components/Padder';
import axios from 'axios';

function App() {

    let url = process.env.REACT_APP_SONGLISTURL;
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

    const handleOnSubmit = () => {
      console.log(song);
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
      </div>
    );
}

export default App;
