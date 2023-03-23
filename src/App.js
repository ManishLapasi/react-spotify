import React from 'react';
import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Switch from './components/Switch';
import SubmitButton from './components/SubmitButton';
import Padder from './components/Padder';
import DisplaySongs from './components/DisplaySongs';
import Slider from './components/Slider';
import axios from 'axios';
import Banner from './components/Banner';

function App(props) {

    let searchurl = process.env.REACT_APP_AWS_LAMBDA_FUNCTION_URL;
    let songlist = props.songlist;
    let id2namesList = props.id2namesList;

    let [attr1, setAttr1] = useState('acousticness');
    let [attr2, setAttr2] = useState('loudness');
    let [attr3, setAttr3] = useState('energy');
    let [attr4, setAttr4] = useState('danceability');

    let [explicit, setExplicit] = useState(true);

    let [sortedSongs1, setSortedSongs1] = useState([]);
    let [sortedSongs2, setSortedSongs2] = useState([]);
    let [sortedSongs3, setSortedSongs3] = useState([]);
    let [sortedSongs4, setSortedSongs4] = useState([]);

    let [slider1, setSlider1] = useState(0);
    let [slider2, setSlider2] = useState(0);
    let [slider3, setSlider3] = useState(0);

    let numsongs = 0;

    const [tagline, setTagline] = useState("Type in a song above and search to get recommendations! You can tweak the sliders to prioritize softer/louder songs and the like.");
    
    const [song, setSong] = useState('');
    const [closestSongs, setClosestSongs] = useState([])
    const [numSongs, setNumSongs] = useState(0);
    const [bannerSong, setBannerSong] = useState('');

    const handleOnSubmit = () => {
      console.log("searching for song with id",song);
      //console.log(searchurl+song+"&explicit="+(+explicit)+"&loudness="+-(slider1/3).toFixed(2)+"&tempo="+-(slider2/3).toFixed(2)+"&danceability="+-(slider3/3).toFixed(2));
      // lower is more related i.e. loudness=-5 returns loud songs, loudness=5 returns soft songs
      axios.get(searchurl+song+"&explicit="+(+explicit)+"&loudness="+-(slider1/3).toFixed(2)+"&tempo="+-(slider2/3).toFixed(2)+"&danceability="+-(slider3/3).toFixed(2))
        .then(function (response) {
            console.log(searchurl+song+"&explicit="+(+explicit)+"&loudness="+-slider1+"&tempo="+-slider2+"&danceability="+-slider3);
            //console.log(searchurl+song+"&explicit=1&loudness="+-slider1+"&tempo="+-slider2+"&danceability="+-slider3);
            //console.log(response);
            let res = response.data//.replace(/\s+/g, '');
            numsongs = parseInt(response.data.substr(-12).replace(",","").replace(")","").trim());
            setBannerSong(song);
            setNumSongs(numsongs);
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
            }).filter((ele)=>ele.track_id!==song);
            console.log("all songs",resSong);
            setClosestSongs(resSong);
            setSortedSongs1(resSong.sort((a,b) => a[attr1]-b[attr1]).slice(0,5));
            setSortedSongs2(resSong.sort((a,b) => a[attr2]-b[attr2]).slice(0,5));
            setSortedSongs3(resSong.sort((a,b) => a[attr3]-b[attr3]).slice(0,5));
            setSortedSongs4(resSong.sort((a,b) => a[attr4]-b[attr4]).slice(0,5));
            setTagline("For the song: '"+id2namesList[song]+"', this app searched through "+numsongs+" songs!");
        });
    }
    
    return (
      <div className="App">
        <div className='topbar'>
          <Padder></Padder>
          <SearchBar songs={songlist} id2names={id2namesList} setSong={setSong}></SearchBar>
          <Padder></Padder>
          <Switch explicit={explicit} setExplicit={setExplicit}></Switch>
          <Padder></Padder>
          <div className='vertStack'>
            <Slider sliderVal={slider1} setSliderVal={setSlider1} leftVal={"Softer"} rightVal={"Louder"}></Slider>
            <Slider sliderVal={slider2} setSliderVal={setSlider2} leftVal={"Lower BPM"} rightVal={"Higher BPM"}></Slider>
            <Slider sliderVal={slider3} setSliderVal={setSlider3} leftVal={"Relax!"} rightVal={"Dance!"}></Slider>
          </div>
          <Padder></Padder>
          <SubmitButton onClick={handleOnSubmit}></SubmitButton>
          <Padder></Padder>
        </div>
        <Banner tagline={tagline} songId={bannerSong} songName={id2namesList[bannerSong]} numSongs={numSongs}></Banner>
        <DisplaySongs closestSongs={closestSongs} attrs={[attr1, attr2, attr3, attr4]} setAttrs={[setAttr1, setAttr2,setAttr3,setAttr4]} sortedSongs={[sortedSongs1, sortedSongs2, sortedSongs3, sortedSongs4]} setSortedSongs={[setSortedSongs1,setSortedSongs2,setSortedSongs3,setSortedSongs4]}></DisplaySongs>
      </div>
    );
}

export default App;





