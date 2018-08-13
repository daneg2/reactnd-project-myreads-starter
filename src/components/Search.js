import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import './Search.css'
import Book from './Book';

class Search extends Component {

    state = {
        searchResults: [

        ],
        error: ''
    }

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
                searchResults : [
        
                ],
                error: result.error
                })
            }
            })
        } else {
            this.setState({
            searchResults : [

            ],
            error: ''
            })
        } 
    } 

    componentDidMount() {
        this.setState( {
            searchResults : [

            ],
            error: ''
        })
    }

    render() {
        return <div className="search-books">
            <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.updateSearch}/> 

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchResults.map((book) => {
                  let bookInfo = this.props.booksInfo[book.id]
                  return ( <li key={book.id}> 
                    <Book
                      bookObject={book}
                      bookTitle={book.title}
                      bookAuthors={(book.authors) ? book.authors : 'Unknown Author'}
                      bookURL={(book.imageLinks) ? book.imageLinks.thumbnail : ''}
                      bookID={book.id}
                      //not calling function, passing reference to function down to component
                      sortMe={this.props.sortMe}
                      bookShelf={(bookInfo) ? bookInfo.shelf : 'none'}
                    />
                  </li> )
                })}
              </ol>
              <h2>{this.state.error}</h2>
            </div>
          </div>
    }
}

export default Search