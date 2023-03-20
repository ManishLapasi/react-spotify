import './DisplaySongs.css';

export default function DisplaySongs(props) {
    return (
        <div className='displaydiv'>
            {props.closestSongs}
        </div>
    )
}