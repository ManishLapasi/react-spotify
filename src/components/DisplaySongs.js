import './DisplaySongs.css';
import DisplaySongNames from './DisplaySongNames';
import DisplaySongInfo from "./DisplaySongInfo";

export default function DisplaySongs(props) {

    let [attr1, attr2, attr3, attr4] = ['acousticness','loudness','danceability','energy'];
    
    return (
        <div className='displaydiv'>
            <DisplaySongNames input={props.closestSongs}></DisplaySongNames>
            <div className='displaydivrow'>
                <DisplaySongInfo input={props.closestSongs} attr={attr1} keyId={1}></DisplaySongInfo>
                <DisplaySongInfo input={props.closestSongs} attr={attr2} keyId={2}></DisplaySongInfo>
            </div>
            <div className='displaydivrow'>
                <DisplaySongInfo input={props.closestSongs} attr={attr3} keyId={3}></DisplaySongInfo>
                <DisplaySongInfo input={props.closestSongs} attr={attr4} keyId={4}></DisplaySongInfo>
            </div>
        </div>
    )
}