import "../styles/Reviews.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewBook from "../Components/NewBook";
import Stars from "../Components/Stars";
import TitleBar from "../Components/TitleBar";
import blank from "../assets/blank.jpeg";
import DeleteScreen from "../Components/DeleteScreen";
import EditScreen from "../Components/EditScreen";

export default function Reviews() {

    const navigate = useNavigate();
    const API = import.meta.env.VITE_API;
    const { user } = useParams();
    const [books, setBooks] = useState([]);
    const [creatingBook, setCreatingBook] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [editing, setEditing] = useState(false);

    const [currentReview, setReview] = useState({
        id: 0,
        rating: 0,
        book_id: 0,
        reviewer: user.toUpperCase(),
        highly_recommend: false,
        content: "No review yet..."
    })
    const [currentTitle, setTitle] = useState({
        "id": 0,
        "title": "SELECT A TITLE",
        "author": "",
        "page_num": 0,
        "cover_img": "",
        "category": "",
        "description": ""
    })

    useEffect(()=> {
        fetch(`${API}/books`)
        .then(res => res.json())
        .then(res => setBooks(res))
        .catch(() => null)
    }, []);

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
        .catch(() => null)
    }, [currentTitle]);

    return(
        <>
        <TitleBar pageName={user.toUpperCase()}/>
        <div className="Reviews">
            <div className="left">
                <div className="current-title">
                    <div className="title">{currentTitle.title}</div>
                    <div className="line"></div>
                </div>
                <div className="books">
                    <div onClick={() => setCreatingBook(true)} className="book">+</div>
                    {books.sort((x, y) => x.id - y.id).map(book => <div onClick={() => setTitle(book)} style={currentTitle.title === book.title ? {boxShadow:"inset 0 0 0 1px white"}: null} key={book.id} className="book">
                        <img style={!book.cover_img ? {filter:"hue-rotate(180deg) grayscale(100%)"} : null} src={book.cover_img || blank} alt="" />
                    </div>)}
                </div>
            </div>
            <div className="right">
                <div className="cover-img">
                    <img style={!currentTitle.cover_img ? {filter:"hue-rotate(180deg) grayscale(100%)"} : null} src={currentTitle.cover_img || blank} alt="cover image" />
                    <div className="title">{currentTitle.title}</div>
                        <div className="author">{currentTitle.author ? `BY ${currentTitle.author}` : null}</div>
                </div>
                <div className="review">
                    <Stars count={currentReview.rating}/>
                        <u>Review</u><br/>
                        {currentReview.content || "No written review yet..."}
                        <div className="spacing"></div>
                </div>
            </div>
        </div>
        <div className="footer">
            <div onClick={() => navigate("/users")} className="button">BACK</div>
            <div className="buttons">
                <div  onClick={() => currentTitle.id ? setDeleting(true) : null} className="delete button">DELETE</div>
                <div  onClick={() => currentTitle.id ? setEditing(true) : null} className="edit button">EDIT</div>
            </div>
        </div>
        {creatingBook ? <NewBook setCreatingBook={setCreatingBook}/> : null}
        {deleting ? <DeleteScreen currentTitle={currentTitle} currentReview={currentReview} setDeleting={setDeleting}/> : null}
        {editing ? <EditScreen  currentTitle={currentTitle} currentReview={currentReview} setEditing={setEditing}/> : null}
        </>
    )
}