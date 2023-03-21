import './DisplaySongInfo.css';
import { useState } from 'react';

export default function DisplaySongInfo(props) {

    let optionslist = ["acousticness","danceability","energy","instrumentalness","key","liveness","loudness","mode","speechiness","tempo","time_signature","track_duration","valence"]

    let [_myattr, setMyAttr] = useState(props.attr);
    let mysongs = props.input;
    let [sortedSongs, setSortedSongs] = useState(mysongs);
    
    const handleChange = (event) => {
        console.log("you selected",event.target.value);
        //console.log("before",mysongs.map((val) => val[event.target.value]));
        mysongs = mysongs.sort((a,b) => a[event.target.value]-b[event.target.value]);
        //console.log("after",mysongs.map((val) => val[event.target.value]));
        setMyAttr((_val) => {return event.target.value;});
        setSortedSongs((_val) => {return mysongs;});
    }
    
    return (
        <div className='boxedinfo'>
            <select onChange={handleChange}>
                {optionslist.map((val) => 
                (<option value={val} key={val}>
                    {val}
                </option>))}
            </select>
            <ul>
            {sortedSongs.slice(0,5).map((track)=>(
                <li key={track["track_id"]+props.keyId}>
                    <a href={"https://open.spotify.com/track/"+track["track_id"]} target="_blank" rel="noreferrer">
                        {track.track_name}
                    </a>
                </li>
            ))}
            </ul>
        </div>
    )
}