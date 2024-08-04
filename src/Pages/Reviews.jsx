import "../styles/Reviews.css";
import TitleBar from "../Components/TitleBar";
import { useEffect, useState } from "react";

export default function Reviews() {

    const API = import.meta.env.VITE_API;
    const [books, setBooks] = useState([]);

    useEffect(()=> {
        fetch(`${API}/books`)
        .then(res => res.json())
        .then(res => setBooks(res))
        .catch(x => null)
    }),[];

    return(
        <>
        <TitleBar pageName="REVIEWS"/>
        <div className="Reviews">
            <div className="left">
                <div className="current-title">HELLO</div>
                <div className="books">
                    <div className="book">+</div>
                    {books.map(book => <div key={book.id} className="book">
                        <img src={book.cover_img} alt="" />
                    </div>)}
                </div>
            </div>
            <div className="right"></div>
        </div>
        </>
    )
}