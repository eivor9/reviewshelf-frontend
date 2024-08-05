import "../styles/Reviews.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Stars from "../Components/Stars";
import TitleBar from "../Components/TitleBar";
import blank from "../assets/blank.jpeg";

export default function Reviews() {

    const navigate = useNavigate();
    const API = import.meta.env.VITE_API;
    const { user } = useParams();
    const [books, setBooks] = useState([]);
    const [currentReview, setReview] = useState({
        id: 0,
        rating: 0,
        book_id: 0,
        reviewer: user.toUpperCase(),
        highly_recommend: false,
        content: "No review yet..."
    })
    const [currentTitle, setTitle] = useState({
        title: "SELECT A TITLE",
        id: 5
    })

    useEffect(()=> {
        fetch(`${API}/books`)
        .then(res => res.json())
        .then(res => {setBooks(res)})
        .catch(x => null)
    }),[];

    useEffect(()=> {
        fetch(`${API}/books/${currentTitle.id}/reviews`)
        .then(res => res.json())
        .then(res => {
            if(res.reviews.some(review => review.reviewer === user.toUpperCase()))
                setReview(res.reviews.find(review => review.reviewer === user.toUpperCase()))
            else
                setReview({
                    id: 0,
                    rating: 0,
                    book_id: currentTitle.id,
                    reviewer: user.toUpperCase(),
                    highly_recommend: false,
                    content: "No review yet..."
                })
        })
        .catch(x => null)
    }),[currentTitle];

    return(
        <>
        <TitleBar pageName="REVIEWS"/>
        <div className="Reviews">
            <div className="left">
                <div className="current-title">
                    <div className="title">{currentTitle.title}</div>
                    <div className="line"></div>
                </div>
                <div className="books">
                    <div className="book">+</div>
                    {books.map(book => <div onClick={() => setTitle(book)} style={currentTitle.title === book.title ? {boxShadow:"inset 0 0 0 1px white"}: null} key={book.id} className="book">
                        <img src={book.cover_img} alt="" />
                    </div>)}
                </div>
            </div>
            <div className="right">
                <div className="cover-img">
                    <img src={currentTitle.cover_img || blank} alt="cover image" />
                    <div className="title">{currentTitle.title}</div>
                        <div className="author">{currentTitle.author ? `BY ${currentTitle.author}` : null}</div>
                </div>
                <div className="review">
                    <Stars count={currentReview.rating}/>
                        <u>Review</u><br/><br/>
                        {currentReview.content || "No written review yet..."}
                        <div className="spacing"></div>
                </div>
            </div>
        </div>
        <div className="footer">
            <div onClick={() => navigate("/users")} className="button">BACK</div>
            <div className="buttons">
                <div className="delete button">DELETE</div>
                <div className="edit button">EDIT</div>
            </div>
        </div>
        </>
    )
}