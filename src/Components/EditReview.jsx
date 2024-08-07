import { useState } from "react";
import "../styles/NewBook.css";
import "../styles/EditReview.css"
import { useParams } from "react-router-dom";

export default function EditReview ({currentReview, currentTitle}) {

    const { user } = useParams();
    const API = import.meta.env.VITE_API;
    const [updatedReview, setUpdatedReview] = useState(currentReview.id ? currentReview : {
        "rating": 1,
        "book_id": currentTitle.id,
        "reviewer": user.toUpperCase(),
        "highly_recommend": false,
        "content": "No written review yet..."
    });

    const updateReview = () => {
        fetch(`${API}/books/${currentTitle.id}/reviews/${currentReview.reviewer.toLowerCase()}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedReview)
        })
        .then(() => window.location.reload())
        .catch((error) => console.error("bad edit form", error));
    };

    const addReview = () => {
        fetch(`${API}/books/${currentTitle.id}/reviews/`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedReview)
        })
        .then(() => window.location.reload())
        .catch((error) => console.error("bad edit form", error));
    };

    const handleTextChange = (event) => {
        setUpdatedReview({...updatedReview, [event.target.id]: event.target.value.toUpperCase()});
    };

    const handleContentChange = (event) => {
        setUpdatedReview({...updatedReview, [event.target.id]: event.target.value});
    };

    const toggleRecommend = () => {
        setUpdatedReview({...updatedReview, highly_recommend: !updatedReview.highly_recommend});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updatedReview.id ? updateReview() : addReview();
    };

    return(
        <div className="NewBook EditReview">
            <div className="legend">EDIT<div className="line"></div></div>
            <form id="myform" onSubmit={handleSubmit}>
                <div className="input select-field">
                    <label htmlFor="rating">rating</label>
                    <div className="select">
                        <select onChange={handleTextChange} value={updatedReview.rating} name="rating" id="rating">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="input">
                    <label htmlFor="highly_recommend">would recommend</label>
                    <input onChange={toggleRecommend} checked={updatedReview.highly_recommend} id="highly_recommend" type="checkbox" />
                </div>
                <div className="input">
                    <label htmlFor="content">{`${currentReview.reviewer}'S REVIEW CONTENT`}</label>
                    <textarea onChange={handleContentChange} value={updatedReview.content} name="content" id="content"></textarea>
                </div>
            </form>
            <div className="buttons">
                <div onClick={() => window.location.reload()} className="button">CANCEL</div>
                <input className="button" type="submit" form="myform" value="SAVE"/>
            </div>
        </div>
    )
}