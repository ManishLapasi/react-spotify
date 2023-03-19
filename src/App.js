import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Switch from './components/Switch';
import axios from 'axios';

function App() {

    let url = "https://raw.githubusercontent.com/ManishLapasi/react-spotify/main/src/components/names_ids.csv";
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
    
    return (
      <div className="App">
        <div className='topbar'>
          <SearchBar songs={songlist} id2names={id2namesList}></SearchBar>
          <Switch></Switch>
        </div>
      </div>
    );
}

export default App;
