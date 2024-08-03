import "../styles/TitleBar.css";
import { FaGithub } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi";

export default function TitleBar({pageName}){
    return (
        <div className="TitleBar">
            <div className="title">{pageName}</div>
            <div className="icon"><HiOutlineBookOpen /></div>
            <div className="title"><FaGithub /></div>
        </div>
    )
}