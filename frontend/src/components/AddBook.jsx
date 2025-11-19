import "./addbook.css";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "../axios"

export default function AddBook({ toggleAdd, setToggleAdd, books, setBooks }) {
    if (!toggleAdd) return null;

    const [userTitle, setUserTitle] = useState("")
    const [userAuthor, setUserAuthor] = useState("")
    const [userDate, setUserDate] = useState(0)
    const [userUrl, setUserUrl] = useState("")
    const [userDescription, setUserDescription] = useState("")

    const handleTitle = (e) => {
        setUserTitle(e.target.value)
    }

    const handleAuthor = (e) => {
        setUserAuthor(e.target.value)
    }

    const handleDate = (e) => {
        setUserDate(e.target.value)
    }

    const handleUrl = (e) => {
        setUserUrl(e.target.value)
    }

    const handleDescription = (e) => {
        setUserDescription(e.target.value)
    }

    async function addBook(book) {
        const res = await api.post("/books", book)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const book = {
            title: userTitle,
            author: userAuthor,
            description: userDescription,
            date: userDate,
            image_url: userUrl
        }

        addBook(book)

        setUserTitle("")
        setUserAuthor("")
        setUserDescription("")
        setUserDate(0)
        setUserUrl("")

    }

    return (
        <div className="modal-overlay" onClick={() => setToggleAdd(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2 style={{color:"black"}}>Add a Book</h2>

                <form onSubmit={handleSubmit} className="add-book-form">

                    <div className="left-form-card">
                        <input 
                            type="text" 
                            placeholder="Title" 
                            required 
                            value={userTitle} 
                            onChange={handleTitle} 
                        />
                        <input 
                            type="text" 
                            placeholder="Author" 
                            required 
                            value={userAuthor} 
                            onChange={handleAuthor} 
                        />
                    </div>

                    <div className="right-form-card">
                        <input 
                            type="number" 
                            placeholder="Date" 
                            required
                            value={userDate} 
                            onChange={handleDate} 
                        />
                        <input 
                            type="text" 
                            placeholder="Image URL" 
                            required 
                            value={userUrl} 
                            onChange={handleUrl} 
                        />
                    </div>

                    <textarea 
                        value={userDescription}
                        id="description-form" 
                        rows={12} 
                        required 
                        onChange={handleDescription} 
                    ></textarea>

                    <div className="modal-actions">
                        <button onClick={() => setToggleAdd(false)} id="cancel-btn">Cancel</button>
                        <button id="save-btn">Save</button>
                    </div>

                </form>

            </div>
        </div>
    );
}