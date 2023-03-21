import './DisplaySongNames.css';

export default function DisplaySongNames(props) {
    props.input.sort((a,b) => a.score-b.score);
    return (
        <div className='boxed'>
            <ul>
            {props.input.map((track)=>(
                <li key={track["track_id"]}><a href={"https://open.spotify.com/track/"+track["track_id"]} target="_blank" rel="noreferrer">{track.track_name}</a></li>
            ))}
            </ul>
        </div>
    )
}