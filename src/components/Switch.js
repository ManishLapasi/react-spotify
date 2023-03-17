import './Switch.css';

function Switch () {
    return (
        <div className='switchgroup'>
            <label className="switch">
                <input type="checkbox"></input>
                <span className="slider round"></span>
            </label>
            <p>Include Explicit Results?</p>
        </div>
    )
}

export default Switch;