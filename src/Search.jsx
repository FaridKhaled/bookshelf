import { Link } from "react-router-dom";
import Book from "./Book";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

export default function Search(props) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const shelfBooks = props.booksInShelf;

  function updateQuery(event) {
    setQuery(event.target.value);
  }

  const onSearchChange = debounce(updateQuery, 600);

  useEffect(() => {
    if (query) {
      fetch(
        "https://www.googleapis.com/books/v1/volumes?q=inauthor:" +
          query +
          "+intitle:" +
          query +
          "&maxResults=40&key=AIzaSyAOymrtBqwUOPE8iMJlG8nxPL73SxIjfUM"
      )
        .then((res) => res.json())
        .then(function (data) {
          setBooks(data.items);
        });
    }
  }, [query]);

  useEffect(() => {
    if (books) {
      const newBooks = books.filter(
        (element) =>
          shelfBooks.findIndex((e) => element.id === e.bookObject.id) === -1
      );

      setBooks(newBooks);
    }
  }, [shelfBooks]);

  return (
    <div>
      <div id="searchContainer">
        <button id="backFromSearch" onClick={props.displayshelf}>
          {/* <Link to="/">
            <i className="fas fa-arrow-left fa-2x"></i>
          </Link> */}
          <i className="fas fa-arrow-left fa-2x"></i>
        </button>

        <form>
          <input
            type="text"
            placeholder="Search by Title or Author"
            onChange={onSearchChange}
          ></input>
        </form>
      </div>

      <div className="booksContainer">
        {books && books.length > 0 && (
          <>
            {books.map((bookObject) => (
              <Book
                key={bookObject.id}
                book={bookObject}
                handleMoveTo={props.shelfBooksChanged}
                removeDisabled={true}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
