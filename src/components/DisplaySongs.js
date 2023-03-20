import './DisplaySongs.css';

export default function DisplaySongs(props) {

    console.log(props.closestSongs);

    return (
        <div className='displaydiv'>
            {props.closestSongs.map((track)=>(
                <p>{track.track_name}</p>
            ))}
        </div>
    )
}