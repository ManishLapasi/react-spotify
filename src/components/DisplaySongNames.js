import './DisplaySongNames.css';
import React from 'react';

export default function DisplaySongNames(props) {
    props.input.sort((a,b) => a.score-b.score);
    return (
        <div className='boxed'>
            <ul>
            {props.input.map((track)=>(
                <li className='listItem' key={track["track_id"]}><a href={"https://open.spotify.com/track/"+track["track_id"]} target="_blank" rel="noopener noreferrer">{track.track_name}</a></li>
            ))}
            </ul>
        </div>
    )
}