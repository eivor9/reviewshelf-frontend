import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import "../styles/Stars.css";

export default function Stars ({count}) {

    const fullStar = <IoStar />;
    const emptyStar = <IoIosStarOutline />;
    const stars = [];
    for(let i = 1; i <= 5; i++){
        if (i <= count) stars.push(<i key={i}>{fullStar}</i>)
        else stars.push(<i key={i}>{emptyStar}</i>)
    }

    return <div className="Stars">{stars}</div>;
}