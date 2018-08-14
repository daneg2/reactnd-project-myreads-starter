import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import Search from './components/Search'

class BooksApp extends React.Component {

  /* Constructor contains state and gets bookState to localStorage to keep results
  constant regardless of refreshes*/
  constructor(props) {
    super(props)
    const bookState = JSON.parse(localStorage.getItem("bookState"))
    this.state = {
      booksInfo: (bookState) ? bookState : {
      }
    }
  }

  /*Functiont that populates booksInfo object and adds shelf - this is then assigned to state.
  Then the bookState is added to localStorage*/
  sortMe = (bookObject, nextShelf) => {
    /* Spreading booksInfo object and adding a dynamic key that is the ID of the book. If the key
    is already there it will merely update it otherwise it adds a new one. I then spread the
    object value of the key to add a shelf key which contains the next shelf value. Everytime sortMe
    gets called the shelf value will be updated with the nextShelf value
    */
    
    let booksInfo = {...this.state.booksInfo, [bookObject.id]:{...bookObject, shelf:nextShelf}}

    //Same as saying {booksInfo:booksInfo}
    this.setState({booksInfo})

    localStorage.setItem("bookState", JSON.stringify(booksInfo))
  }

  render() {
    return (
      <div className="app">
        {/* Route for main book shelves page */}
         <Route exact path="/" render={() => (
            <BookShelf 
              booksInfo={this.state.booksInfo} 
              sortMe={this.sortMe}
              />
          )}/>
          {/* Route for search page */}
          <Route path="/search" render={() => (
            <Search 
              booksInfo={this.state.booksInfo}
              sortMe={this.sortMe}
              />
          )}/>
      </div>
    )
  }
}

export default BooksApp
