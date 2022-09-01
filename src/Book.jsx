import genericCover from "./generic-book-cover.svg";
import { useEffect, useState } from "react";

export default function Books(props) {
  const book = props.book;
  const [cover, setBookCover] = useState(genericCover);
  const [shelf, setShelf] = useState();

  function MoveTo(event) {
    setShelf(event.target.value);

    props.handleMoveTo({
      bookObject: book,
      shelf: event.target.value,
    });
  }

  return (
    <div className="book">
      <img
        src={
          book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : cover
        }
      />

      {/* <button id="MoveTo">
        <i className="fas fa-caret-down fa-lg"></i>
      </button> */}

      <label>
        <select id="MoveTo" defaultValue={null} onChange={MoveTo}>
          <optgroup label="Move To">
            <option hidden></option>
            <option value="CURRENTLY READING"> Currently Reading </option>
            <option value="WANT TO READ"> Want To Read </option>
            <option value="READ"> Read </option>
            <option value="REMOVE" disabled={props.removeDisabled}>
              Remove
            </option>
          </optgroup>
        </select>
      </label>

      <h5> {book.volumeInfo.title} </h5>

      <p className="author">
        {" "}
        {book.volumeInfo.authors
          ? book.volumeInfo.authors[0]
          : "Unknown Author"}{" "}
      </p>
    </div>
  );
}
