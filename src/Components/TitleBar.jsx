import "../styles/TitleBar.css";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineBookOpen } from "react-icons/hi";

export default function TitleBar({pageName}){
    const navigate = useNavigate();
    return (
        <div className="TitleBar">
            <div className="title">{pageName}</div>
            <div className="icon"><HiOutlineBookOpen onClick={() => navigate("/")} /></div>
            <div className="title"><a target="_blank" href="https://github.com/eivor9/reviewshelf-frontend"><FaGithub /></a></div>
        </div>
    )
}