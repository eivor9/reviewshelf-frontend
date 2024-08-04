import "../styles/Users.css";
import { useState, useEffect } from "react";
import TitleBar from "../Components/TitleBar";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API;
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        fetch(`${API}/reviews`)
        .then(res => res.json())
        .then(res => setUsers(res.map(x => x.reviewer).filter(onlyUnique).sort((x,y) => x < y ? -1 : 1)))
        .catch(x => null)
    }),[];
    
    return (
        <>
            <TitleBar pageName="USERS"/>
            <div className="Users">
                <div className="user-list">
                    {users.map(user => {
                        return (
                            <div key={user} onClick={() => navigate(`/reviews/${user.toLowerCase()}`)} className="user">{user}</div>
                        )
                    })}
                </div>
                <div className="description">Who's reviews would you like to see?</div>
            </div>
        </>
    )
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }