import { useState } from "react";
import "../styles/NewBook.css";

export default function NewBook ({currentTitle}) {
    const categories = ["FANTASY", "NON-FICTION", "ROMANCE", "THRILLER/HORROR", "YOUNG ADULT"];
    const API = import.meta.env.VITE_API;
    const [newBook, setNewBook] = useState(currentTitle.id ? currentTitle : {
        "title": "",
        "author": "",
        "page_num": 0,
        "cover_img": "",
        "category": "NON-FICTION",
        "description": ""
    })

    const addBook = () => {
        fetch(`${API}/books/`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBook)
        })
        .then(() => window.location.reload())
        .catch((error) => console.error("bad edit form", error));
    };

    const handleTextChange = (event) => {
        setNewBook({...newBook, [event.target.id]: event.target.value});
    };
    const handleNumberChange = (event) => {
        setNewBook({...newBook, [event.target.id]: Number(event.target.value)});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addBook();
    };

    return(
        <div className="NewBook">
            <div className="legend">ADD A TITLE<div className="line"></div></div>
            <form id="myform" onSubmit={handleSubmit}>
                <div className="input">
                    <label htmlFor="title">title</label>
                    <input required onChange={handleTextChange} id="title" type="text" />
                </div>
                <div className="input">
                    <label htmlFor="author">author</label>
                    <input required onChange={handleTextChange} id="author" type="text" />
                </div>
                <div className="input">
                    <label htmlFor="cover_img">cover url</label>
                    <input onChange={handleTextChange} id="cover_img" type="text" />
                </div>
                <div className="input">
                    <label htmlFor="description">description</label>
                    <input onChange={handleTextChange} id="description" type="text" />
                </div>
                <div className="input select-field">
                    <label htmlFor="category">category</label>
                    <div className="select">
                        <select onChange={handleTextChange} value={newBook.category} name="category" id="category">
                            {categories.map(category => <option key={category} value={category}>{category}</option>)}
                        </select>
                    </div>
                </div>
                <div className="input">
                    <label onChange={handleNumberChange} htmlFor="page_num"># of pages</label>
                    <input min="0" id="page_num" type="number" />
                </div>
            </form>
            <div className="buttons">
                <div onClick={() => window.location.reload()} className="button">CANCEL</div>
                <input className="button" type="submit" form="myform" value="SAVE"/>
            </div>
        </div>
    )
}