import "../styles/Users.css";
import { useState, useEffect } from "react";
import TitleBar from "../Components/TitleBar";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API;
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState("");

    const handleTextChange = (event) => {
        setNewUser(event.target.value.toUpperCase());
    }

    useEffect(()=> {
        fetch(`${API}/reviews`)
        .then(res => res.json())
        .then(res => setUsers(res.map(x => x.reviewer).filter(onlyUnique).sort((x,y) => x < y ? -1 : 1)))
        .catch(x => null)
    }),[];

    const handleSubmit = (event) => {
        event.preventDefault();
        if (goodUserName(newUser))
            navigate(`/reviews/${newUser.toLowerCase()}`);
        else
            alert("A USER'S NAME MUST CONTAIN LETTERS ONLY");
    }
    
    const goodUserName = (name) => {
        for (let i = 0; i < name.length; i++) {
            if(name[i] < "A" || name[i] > "Z")
                return false;
        }
        return true;
    }    

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
                <div className="users-footer">
                    <form onSubmit={handleSubmit}>
                        <div className="input">
                            <input placeholder="NEW USER" onChange={handleTextChange} value={newUser} type="text" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}