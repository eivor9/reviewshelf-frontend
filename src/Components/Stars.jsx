import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import "../styles/Stars.css";
import { DiVim } from "react-icons/di";

export default function Stars ({count}) {

    const fullStar = <IoStar />;
    const emptyStar = <IoIosStarOutline />;
    const stars = [];
    for(let i = 1; i <= 5; i++){
        if (i <= count) stars.push(fullStar)
        else stars.push(emptyStar)
    }

    return <div className="Stars">{stars}</div>;
}