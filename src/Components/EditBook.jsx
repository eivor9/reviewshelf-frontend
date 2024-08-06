import { useState } from "react";
import "../styles/NewBook.css";

export default function EditBook ({currentTitle}) {
    const categories = ["FANTASY", "NON-FICTION", "ROMANCE", "THRILLER/HORROR", "YOUNG ADULT"];
    const API = import.meta.env.VITE_API;
    const [updatedBook, setUpdatedBook] = useState(currentTitle);

    const updateBook = () => {
        fetch(`${API}/books/${updatedBook.id}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBook)
        })
        .then(() => window.location.reload())
        .catch((error) => console.error("bad edit form", error));
    };

    const handleTextChange = (event) => {
        setUpdatedBook({...updatedBook, [event.target.id]: event.target.value.toUpperCase()});
    };

    const handleURLChange = (event) => {
        setUpdatedBook({...updatedBook, [event.target.id]: event.target.value});
    };

    const handleNumberChange = (event) => {
        setUpdatedBook({...updatedBook, [event.target.id]: Number(event.target.value)});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateBook();
    };

    return(
        <div className="NewBook">
            <div className="legend">EDIT<div className="line"></div></div>
            <form id="myform" onSubmit={handleSubmit}>
                <div className="input">
                    <label htmlFor="title">title</label>
                    <input required value={updatedBook.title} onChange={handleTextChange} id="title" type="text" />
                </div>
                <div className="input">
                    <label htmlFor="author">author</label>
                    <input required value={updatedBook.author} onChange={handleTextChange} id="author" type="text" />
                </div>
                <div className="input">
                    <label htmlFor="cover_img">cover url</label>
                    <input value={updatedBook.cover_img} onChange={handleURLChange} id="cover_img" type="url" />
                </div>
                <div className="input">
                    <label htmlFor="description">description</label>
                    <input value={updatedBook.description} onChange={handleTextChange} id="description" type="text" />
                </div>
                <div className="input select-field">
                    <label htmlFor="category">category</label>
                    <div className="select">
                        <select onChange={handleTextChange} value={updatedBook.category} name="category" id="category">
                            {categories.map(category => <option key={category} value={category}>{category}</option>)}
                        </select>
                    </div>
                </div>
                <div className="input">
                    <label value={updatedBook.page_num} onChange={handleNumberChange} htmlFor="page_num"># of pages</label>
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