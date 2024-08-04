import "../styles/Reviews.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Stars from "../Components/Stars";
import TitleBar from "../Components/TitleBar";

export default function Reviews() {

    const API = import.meta.env.VITE_API;
    const { user } = useParams();
    const [books, setBooks] = useState([]);
    const [currentReview, setReview] = useState({
        content: "No review yet...",
        rating: 0
    })
    const [currentTitle, setTitle] = useState({
        title: "SELECT A TITLE",
        id: 0,
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
        .then(res => setReview(res.reviews.find(review => review.reviewer === user.toUpperCase())))
        .catch(x => null)
    }),[currentTitle];

    return(
        <>
        <TitleBar pageName="REVIEWS"/>
        <div className="Reviews">
            <div className="left">
                <div className="current-title">{currentTitle.title}</div>
                <div className="books">
                    <div className="book">+</div>
                    {books.map(book => <div onClick={() => setTitle(book)} style={currentTitle.title === book.title ? {boxShadow:"inset 0 0 0 1px white"}: null} key={book.id} className="book">
                        <img src={book.cover_img} alt="" />
                    </div>)}
                </div>
            </div>
            <div className="right">
                <div className="cover-img">
                    <img src={currentTitle.cover_img} alt="cover image" />
                </div>
                <div className="review">
                    <Stars count={currentReview.rating}/>
                    {currentReview.content || "No review yet..."}
                </div>
            </div>
        </div>
        </>
    )
}