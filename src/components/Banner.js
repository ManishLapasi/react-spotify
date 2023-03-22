import "./Banner.css";

export default function Banner(props) {
    return (
        <div className="banner">
            {props.tagline}
        </div>
    )
}