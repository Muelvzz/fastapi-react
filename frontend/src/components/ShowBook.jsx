import "./showbook.css"
import UpdateBook from "./UpdateBook"
import { useState, useEffect } from "react"
import api from "../axios"
import { use } from "react"

export default function ShowBook({ books, selectedBook, setSelectedBook }) {

    const [toggleDelete, setToggleDelete] = useState(false)
    const [deleteId, setDeleteId] = useState(0)

    async function deleteBook(id) {
        const res = await api.delete(`/books/${id}`)
    }
    
    if (deleteId !== 0 && toggleDelete) {
        deleteBook(deleteId)
        setDeleteId(0)
        setToggleDelete(false)
    }

    return (
        <>
            {books.map(book => (
                <>
                    <div className="book-card" key={book.id}>

                        <div className="left-card">
                            <h2>{book.title}</h2>

                            <div className="inline-card">
                                <h3>{book.author}</h3>
                                <p>{book.date}</p>
                            </div>

                            <p>{book.description}</p>
                        </div>

                        <div className="right-card">
                            <img src={book.image_url} alt={book.title} className="book-image" />
                        </div>

                    </div>
                    <div className="button-container">
                        <button 
                            key={book.id} 
                            id="update-btn"
                            onClick={() => setSelectedBook(book)}
                        >Update</button>
                        <button 
                            key={book.id} 
                            id="delete-btn"
                            onClick={() => {setDeleteId(book.id), setToggleDelete(true)}}
                        >Delete</button>
                    </div>
                </>
            ))
            }

            {selectedBook && (
                <UpdateBook
                    setSelectedBook={setSelectedBook}
                    id={selectedBook.id}
                    title={selectedBook.title}
                    author={selectedBook.author}
                    date={selectedBook.date}
                    description={selectedBook.description}
                    imageUrl={selectedBook.image_url}
                />
            )}
        </>
    )
}