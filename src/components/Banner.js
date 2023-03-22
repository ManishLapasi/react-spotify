import "./Banner.css";
import { Spotify } from "react-spotify-embed";
import React from "react";

export default function Banner(props) {
    return (
        <div className="banner">
            {props.songId==="" ? (<span>{props.tagline}</span>) : (<div><span>For the song </span><a href={"https://open.spotify.com/track/"+props.songId} className="linker" target="_blank" rel="noopener noreferrer">{props.songName}</a><span> <div className="embedder"><Spotify wide height={"100px"}  link={"https://open.spotify.com/track/"+props.songId}></Spotify></div> this app searched through {props.numSongs} songs!</span></div>)}
        </div>
    )
}