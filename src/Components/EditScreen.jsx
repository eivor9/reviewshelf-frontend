import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/DeleteScreen.css";
import EditBook from "./EditBook";
import EditReview from "./EditReview";

const API = import.meta.env.VITE_API;

export default function DeleteScreen({setEditing, currentReview, currentTitle}){

    const [editingBook, setEditingBook] = useState(false);
    const [editingReview, setEditingReview] = useState(false);

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
            {
            editingBook ? <EditBook currentTitle={currentTitle}/>
            :
            editingReview ? <EditReview currentTitle={currentTitle} currentReview={currentReview}/>
            :
            <>
            <div className="legend">EDIT<div className="line"></div></div>
            <div className="delete-options">
                <div className="question">What would you like to edit?</div>
                <div className="options">
                    <div onClick={() => setEditingReview(true)} className="option">{currentReview.reviewer}'S REVIEW</div>
                    <div onClick={() => setEditingBook(true)} className="option">{currentTitle.title}</div>
                </div>
            </div>
            <div onClick={() => setEditing(false)} className="cancel">CANCEL</div>
            </>
            }
        </div>
    )
}