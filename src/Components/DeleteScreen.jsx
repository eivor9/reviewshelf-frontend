import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/DeleteScreen.css";

const API = import.meta.env.VITE_API;

export default function DeleteScreen({setDeleting, currentReview, currentTitle}){

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
            <div className="legend">DELETE<div className="line"></div></div>
            <div className="delete-options">
                <div className="question">What would you like to delete?</div>
                <div className="options">
                    {currentReview.rating?<div onClick={() => handleReviewDelete()} className="option">{currentReview.reviewer}'S REVIEW</div> : null}
                    <div onClick={() => handleBookDelete()} className="option">{currentTitle.title}</div>
                </div>
            </div>
            <div onClick={() => setDeleting(false)} className="cancel">CANCEL</div>
        </div>
    )
}