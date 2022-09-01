import './App.css';
import React from 'react';
import Search from './Search';
import Book from './Book'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: false,
      shelfBooks: []
    }

    this.toggleSearch = this.toggleSearch.bind(this);
    this.setShelfBooks = this.setShelfBooks.bind(this);
  }

  toggleSearch = () => {
    this.setState({
      search: !this.state.search
    })
  }

  setShelfBooks = (newBook) => {

    if (this.state.shelfBooks.length > 0) {
      const index = this.state.shelfBooks.map(element => element.bookObject.id).indexOf(newBook.bookObject.id);

      if (index === -1) { // new book not present in the shelf
        this.setState({
          shelfBooks: [...this.state.shelfBooks, newBook]
        })
      }
      else { // new book is already present in the shelf, update which shelf it is in

        //if book is to be removed
        if (newBook.shelf == "REMOVE") {

          const newBooks = this.state.shelfBooks.filter(element => element.bookObject.id !== newBook.bookObject.id);

          this.setState({
            shelfBooks: newBooks
          })

        } else { //determine new shelf

          const newShelfBooks = this.state.shelfBooks.map(element => {
            if (element.bookObject.id === newBook.bookObject.id) {
              return { ...element, shelf: newBook.shelf };
            }

            return element;
          });

          this.setState({
            shelfBooks: newShelfBooks
          })

        }
      }
    }
    else {
      this.setState({
        shelfBooks: [newBook]
      })
    }
  }

  render() {
    return (
      <div className="App">

        {!this.state.search &&
          <div id="shelf">
            <header>
              <h1> Bookshelf </h1>
            </header>

            <section id="currentlyReading">

              <h2> Currently Reading </h2>

              <div className='booksContainer'>

                {this.state.shelfBooks.length > 0 &&
                  (
                    <>
                      {
                        this.state.shelfBooks.filter(element => element.shelf === "CURRENTLY READING"
                        ).map(book => (
                          <Book
                            key={book.bookObject.id}
                            book={book.bookObject}
                            handleMoveTo={this.setShelfBooks}
                            removeDisabled={false}
                          />
                        ))
                      }
                    </>
                  )}

              </div>

              <hr></hr>

            </section>

            <section id="wantToRead">

              <h2> Want To Read </h2>

              <div className='booksContainer'>

                {this.state.shelfBooks.length > 0 &&
                  (
                    <>
                      {
                        this.state.shelfBooks.filter(element => element.shelf === "WANT TO READ"
                        ).map(book => (
                          <Book
                            key={book.bookObject.id}
                            book={book.bookObject}
                            handleMoveTo={this.setShelfBooks}
                            removeDisabled={false}
                          />
                        ))
                      }
                    </>
                  )}

              </div>

              <hr></hr>

            </section>

            <section id="read">

              <h2> Read </h2>

              <div className='booksContainer'>

                {this.state.shelfBooks.length > 0 &&
                  (
                    <>
                      {
                        this.state.shelfBooks.filter(element => element.shelf === "READ"
                        ).map(book => (
                          <Book
                            key={book.bookObject.id}
                            book={book.bookObject}
                            handleMoveTo={this.setShelfBooks}
                            removeDisabled={false}
                          />
                        ))
                      }
                    </>
                  )}

              </div>

            </section>

            <button id="addBook" onClick={this.toggleSearch}>
              {/* <Link to="/search"> <i className="fas fa-plus fa-2x"></i> </Link> */}
              <i className="fas fa-plus fa-2x"></i>
            </button>
          </div>
        }

        {this.state.search &&
          <div>
            {
              <Search
                displayshelf={this.toggleSearch}
                shelfBooksChanged={this.setShelfBooks}
                booksInShelf={this.state.shelfBooks}
              />
            }
          </div>
        }

      </div>
    );
  }

}

export default App;