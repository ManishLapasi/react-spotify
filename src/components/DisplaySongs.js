import './DisplaySongs.css';
import DisplaySongNames from './DisplaySongNames';
import DisplaySongInfo from "./DisplaySongInfo";
import React from 'react';

export default function DisplaySongs(props) {

    let [attr1, attr2, attr3, attr4] = props.attrs;
    let [setAttr1, setAttr2, setAttr3, setAttr4] = props.setAttrs;
    let [sortedSongs1, sortedSongs2, sortedSongs3, sortedSongs4] = props.sortedSongs;
    let [setSortedSongs1, setSortedSongs2, setSortedSongs3, setSortedSongs4] = props.setSortedSongs;
    
    return (
        <div className='displaydiv'>
            <DisplaySongNames input={props.closestSongs}></DisplaySongNames>
            <div className='displaydivrow'>
                <DisplaySongInfo input={props.closestSongs} attr={attr1} setAttr={setAttr1} sortedSongs={sortedSongs1} setSortedSongs={setSortedSongs1} keyId={1}></DisplaySongInfo>
                <DisplaySongInfo input={props.closestSongs} attr={attr2} setAttr={setAttr2} sortedSongs={sortedSongs2} setSortedSongs={setSortedSongs2} keyId={2}></DisplaySongInfo>
            </div>
            <div className='displaydivrow'>
                <DisplaySongInfo input={props.closestSongs} attr={attr3} setAttr={setAttr3} sortedSongs={sortedSongs3} setSortedSongs={setSortedSongs3} keyId={3}></DisplaySongInfo>
                <DisplaySongInfo input={props.closestSongs} attr={attr4} setAttr={setAttr4} sortedSongs={sortedSongs4} setSortedSongs={setSortedSongs4}  keyId={4}></DisplaySongInfo>
            </div>
        </div>
    )
}