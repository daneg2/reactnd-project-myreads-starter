import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import './Search.css'
import Book from './Book';

//component that implements search functionality
class Search extends Component {

    state = {
        searchResults: [

        ],
        error: ''
    }

   /* Gets value from input field and calls BooksAPI search method. If input field is not empty, set
   the searchResults state to the results. If the input field is empty, clear the searchResults state
   and display nothing. If no results are returned, clear searchResults and display error.
   */
    updateSearch = (e) => {
        if(e.target.value !== "") {
            BooksAPI.search(e.target.value).then((result) => {
            if(!result.error) {
                this.setState({
                    searchResults: result,
                    error: ''
                })
            } else {
                this.setState({
                searchResults: [
        
                ],
                error: result.error
                })
            }
            })
        } else {
            this.setState({
            searchResults: [

            ],
            error: ''
            })
        } 
    } 

    //clear searchResults and error state whenever leave search page
    componentDidMount() {
        this.setState( {
            searchResults: [

            ],
            error: ''
        })
    }

    render() {
        return <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/* On change of input field, call updateSearch method */}
                    <input type="text" placeholder="Search by title or author" onChange={this.updateSearch}/> 

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {/* Map over all results and create book objects */}
                    {this.state.searchResults.map((book) => {
                        let bookInfo = this.props.booksInfo[book.id]
                        return ( <li key={book.id}> 
                            <Book
                            bookObject={book}
                            bookTitle={book.title}
                            bookAuthors={(book.authors) ? book.authors : 'Unknown Author'}
                            bookURL={(book.imageLinks) ? book.imageLinks.thumbnail : ''}
                            bookID={book.id}
                            //Not calling function, create connection to method in App.js
                            sortMe={this.props.sortMe}
                            //Assign shelf/default shelf
                            bookShelf={(bookInfo) ? bookInfo.shelf : 'none'}
                            />
                        </li> )
                    })}
                </ol>
                {/* Display error if no results are returned */}
                {this.state.error.length > 0 &&
                    <h2 className="error-msg">
                        No results have been found.
                    </h2>
                }
            </div>
        </div>
    }
}

export default Search