import './Switch.css';

function Switch () {
    return (
        <div className='switchgroup'>
            <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
            </label>
            <p>Explicit Results</p>
        </div>
    )
}

export default Switch;