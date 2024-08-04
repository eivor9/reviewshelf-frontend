import "../styles/Users.css";
import { useState, useEffect } from "react";
import TitleBar from "../Components/TitleBar";

export default function Users() {

    const API = import.meta.env.VITE_API;
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        fetch(`${API}/reviews`)
        .then(res => res.json())
        .then(res => setUsers(res.reviews.map(x => x.reviewer).filter(onlyUnique).sort((x,y) => x < y ? -1 : 1)))
    }),[];
    
    return (
        <>
            <TitleBar pageName="USERS"/>
            <div className="Users">
                <div className="user-list">
                    {users.map(user => {
                        return (
                            <div key={user} className="user">{user}</div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }