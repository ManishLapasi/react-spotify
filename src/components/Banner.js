import "./Banner.css";

export default function Banner(props) {
    return (
        <div className="banner">
            {props.songId==="" ? (<span>{props.tagline}</span>) : (<div><span>For the song </span><a href={"https://open.spotify.com/track/"+props.songId} className="linker" target="_blank" rel="noreferrer">{props.songName}</a><span> this app searched through {props.numSongs} songs!</span></div>)}
        </div>
    )
}