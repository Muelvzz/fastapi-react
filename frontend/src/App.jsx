import { useState, useEffect } from 'react'
import ShowBook from "./components/ShowBook"
import AddBook from "./components/AddBook"
import UpdateBook from "./components/UpdateBook"
import api from "./axios"

import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [toggleAdd, setToggleAdd] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    async function loadBooks() {
      const res = await api.get("/books")
      setBooks(res.data)
    }
    loadBooks()
  }, [selectedBook])

  return (
    <>
      <header>Library Management System</header>
      <main>

        <div className="button-container">
          <button
            id='add-btn'
            onClick={() => setToggleAdd(true)}
          >Add a Book</button>
        </div>

        <div className="book-container">
          <ShowBook
            books={books}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
          />
        </div>

        {toggleAdd && (
          <AddBook
            toggleAdd={toggleAdd}
            setToggleAdd={setToggleAdd}
            books={books}
            setBooks={setBooks}
          />
        )}

      </main>
    </>
  )
}

export default App
