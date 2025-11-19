import "./updatebook.css";
import { useState, useEffect } from "react";
import axios from "axios";
import api from "../axios"

export default function UpdateBook({ setSelectedBook, id, title, author, date, description, imageUrl }) {

    const [userTitle, setUserTitle] = useState(title)
    const [userAuthor, setUserAuthor] = useState(author)
    const [userDate, setUserDate] = useState(date)
    const [userUrl, setUserUrl] = useState(imageUrl)
    const [userDescription, setUserDescription] = useState(description)

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

    async function updateBook(book, id) {
        const res = await api.put(`/books/${id}`, book)
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

        updateBook(book, id)

        setSelectedBook(null)
    }

    return (
        <div className="modal-overlay" key={id}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2 style={{color:"black"}}>Update {title}</h2>

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
                        <button onClick={() => setSelectedBook(null)} id="cancel-btn">Cancel</button>
                        <button id="save-btn">Save</button>
                    </div>

                </form>

            </div>
        </div>
    );
}