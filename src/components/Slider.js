import "./Slider.css";

export default function Slider(props) {

    let [sliderVal, setSliderVal] = [props.sliderVal, props.setSliderVal];

    const handleSliderChange = (event) => {
        console.log("value is now ",event.target.value);
        setSliderVal(event.target.value);
    }

    return (
        <div className="sliderObj">
            {props.leftVal}<input type="range" min="-3" max="3" defaultValue={sliderVal} onChange={handleSliderChange} />{props.rightVal}
        </div>
    )
}