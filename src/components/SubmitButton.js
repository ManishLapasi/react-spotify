import './SubmitButton.css';

function SubmitButton(props) {
    return (
        <div className='submitButton'>
            <button onClick={props.onClick}>Find Songs!</button>
        </div>
    )
}

export default SubmitButton;