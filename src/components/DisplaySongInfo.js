import './DisplaySongInfo.css';
import React from 'react';
import { Spotify } from "react-spotify-embed";

export default function DisplaySongInfo(props) {

    let optionslist = ["acousticness","danceability","energy","instrumentalness","key","liveness","loudness","mode","speechiness","tempo","time_signature","track_duration","valence"]

    let [myAttr, setMyAttr] =[props.attr, props.setAttr];
    let mysongs = props.input;
    let [sortedSongs, setSortedSongs] = [props.sortedSongs, props.setSortedSongs];
    
    const handleChange = (event) => {
        console.log("you selected",event.target.value, "original", myAttr);
        //console.log("before",mysongs.map((val) => [val.track_name, val[event.target.value]]));
        mysongs = mysongs.sort((a,b) => a[event.target.value]-b[event.target.value]);
        //console.log("after",mysongs.map((val) => [val.track_name, val[event.target.value]]));
        setMyAttr(event.target.value);
        setSortedSongs(mysongs.slice(0,5));
    }
    
    return (
        <div className='boxedinfo'>
            <select className='selectLabel' onChange={handleChange} defaultValue={myAttr}>
                {optionslist.map((val) => (<option value={val} key={val}>
                        {val}
                    </option>))}
            </select>
            <ul>
            {sortedSongs.map((track)=>(
                <div className="infoEmbedder"><Spotify wide  link={"https://open.spotify.com/track/"+track["track_id"]}></Spotify></div>
            ))}
            </ul>
        </div>
    )
}