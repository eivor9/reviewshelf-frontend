import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import TitleBar from "../Components/TitleBar";

export default function Home() {
    const navigate = useNavigate();
    return(
        <>
            <TitleBar pageName={'HOME'}/>
            <div className="Home">
                <div className="left-side">
                    <div onClick={() => navigate("/users")} className="enter-button">ENTER</div>
                </div>
                <div className="right-side">
                    <div className="description">Welcome to Review Shelf, where you can easily keep track of your book reviews and share your thoughts with friends.</div>
                </div>
            </div>
        </>
    )
}