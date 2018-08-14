import React, { Component } from 'react'
import './BookShelf.css'
import { Link } from 'react-router-dom'
import Book from './Book';

class BookShelf extends Component {

    /*Method to sort booksInfo object into specific shelves and display book*/
    displayShelf = (shelfName) => {
      const {booksInfo} = this.props
      
      return Object.keys(booksInfo).map((book) => {
          if(booksInfo[book].shelf === shelfName) {
            return ( <li key={booksInfo[book].id}> 
                <Book
                bookObject={booksInfo[book]}
                bookTitle={booksInfo[book].title}
                //Handle no authors or no images
                bookAuthors={(booksInfo[book].authors) ? booksInfo[book].authors : 'Unknown author'}
                bookURL={(booksInfo[book].imageLinks) ? booksInfo[book].imageLinks.thumbnail : ''}
                bookID={booksInfo[book].id}
                bookShelf={booksInfo[book].shelf}
                //not calling function, referencing App.js
                sortMe={this.props.sortMe}
                />
            </li> )
          }
      })
    }

    render() {
      //Call displayShelf method for each shelf
        return  <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.displayShelf("currentlyReading")}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.displayShelf("wantToRead")}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.displayShelf("read")}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
              <Link to="/search">Add a book</Link>
          </div>
      </div>
    }
}

export default BookShelf