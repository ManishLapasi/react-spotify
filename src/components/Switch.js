import './Switch.css';
import React from 'react';

function Switch (props) {

    let [explicit,setExplicit] = [props.explicit,props.setExplicit];

    const handleExpChange = () => {
        setExplicit((prevExp) => {
            //console.log(prevExp);
            return !prevExp;
        })
    }

    return (
        <div className='switchgroup'>
            <label className="switch">
                <input type="checkbox" defaultChecked={explicit} onChange={handleExpChange}/>
                <span className="slider round"></span>
            </label>
            <p>Explicit Results</p>
        </div>
    )
}

export default Switch;