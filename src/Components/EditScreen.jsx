import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/DeleteScreen.css";
import NewBook from "./NewBook";

const API = import.meta.env.VITE_API;

export default function DeleteScreen({setEditing, currentReview, currentTitle}){

    const [editingBook, setEditingBook] = useState(false);

    const handleBookDelete = () => {
        fetch(`${API}/books/${currentTitle.id}`, { method: "DELETE" })
        .then(() => window.location.reload())
        .catch((error) => console.error(error));
    };
    
    const handleReviewDelete = () => {
        fetch(`${API}/books/${currentTitle.id}/reviews/${currentReview.reviewer}`, { method: "DELETE" })
        .then(() => setDeleting(false))
        .catch((error) => console.error(error));
    };

    return(
        <div className="DeleteScreen">
            {editingBook ? <NewBook currentTitle={currentTitle}/>
            :
            <>
            <div className="legend">EDIT<div className="line"></div></div>
            <div className="delete-options">
                <div className="question">What would you like to edit?</div>
                <div className="options">
                    <div className="option">{currentReview.reviewer}'S REVIEW</div>
                    <div onClick={() => setEditingBook(true)} className="option">{currentTitle.title}</div>
                </div>
            </div>
            <div onClick={() => setEditing(false)} className="cancel">CANCEL</div>
            </>
            }
        </div>
    )
}