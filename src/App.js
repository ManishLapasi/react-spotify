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

    let [attr1, setAttr1] = useState('acousticness');
    let [attr2, setAttr2] = useState('loudness');
    let [attr3, setAttr3] = useState('energy');
    let [attr4, setAttr4] = useState('danceability');

    let [sortedSongs1, setSortedSongs1] = useState([]);
    let [sortedSongs2, setSortedSongs2] = useState([]);
    let [sortedSongs3, setSortedSongs3] = useState([]);
    let [sortedSongs4, setSortedSongs4] = useState([]);

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
      axios.get(searchurl+song+"&explicit=1&loudness=1&tempo=1&danceability=1")
        .then(function (response) {
            console.log(response);
            let res = response.data//.replace(/\s+/g, '');
            let numsongs = parseInt(response.data.substr(-12).replace(",","").replace(")","").trim());
            console.log(numsongs);
            let resSong = []
            for(let i=0; i<res.length; i++){
              if (res[i-1]==='{'){
                let currsong = '';
                while(res[i+1]!=='}'){
                  currsong += res[i];
                  i++;
                }
                resSong.push(currsong.trim());
              }
            }
            resSong = resSong.map((ele) => {
              return Object.fromEntries(ele.split(",\n").map((inst) => inst.trim().split(":").map((entry) => entry.trim().replace(/,\s*$/, "").replaceAll('"',""))));
            });
            //console.log(resSong);
            setClosestSongs(resSong);
            setSortedSongs1(resSong.sort((a,b) => a[attr1]-b[attr1]).slice(0,5));
            setSortedSongs2(resSong.sort((a,b) => a[attr2]-b[attr2]).slice(0,5));
            setSortedSongs3(resSong.sort((a,b) => a[attr3]-b[attr3]).slice(0,5));
            setSortedSongs4(resSong.sort((a,b) => a[attr4]-b[attr4]).slice(0,5));
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
        <DisplaySongs closestSongs={closestSongs} attrs={[attr1, attr2, attr3, attr4]} setAttrs={[setAttr1, setAttr2,setAttr3,setAttr4]} sortedSongs={[sortedSongs1, sortedSongs2, sortedSongs3, sortedSongs4]} setSortedSongs={[setSortedSongs1,setSortedSongs2,setSortedSongs3,setSortedSongs4]}></DisplaySongs>
      </div>
    );
}

export default App;





