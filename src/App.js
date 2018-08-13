import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import Search from './components/Search'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    const bookState = JSON.parse(localStorage.getItem("bookState"))
    this.state = {
      booksInfo: (bookState) ? bookState : {
      }
    }
  }

  sortMe = (bookObject, nextShelf) => {
    /* spreading booksInfo object and adding a dynamic key that is the ID of the book. If the key
    is already there it will merely update it otherwise it adds a new one. I then spread the
    object value of the key to add a shelf key which contains the next shelf value. Everytime sortMe
    gets called the shelf value will be updated with the nextShelf value
    */
    
    let booksInfo = {...this.state.booksInfo, [bookObject.id]:{...bookObject, shelf:nextShelf}}

    //same as saying {booksInfo:booksInfo}
    this.setState({booksInfo})

    localStorage.setItem("bookState", JSON.stringify(booksInfo))
  }

  render() {
    return (
      <div className="app">
         <Route exact path="/" render={() => (
            <BookShelf 
              booksInfo={this.state.booksInfo} 
              sortMe={this.sortMe}
              />
          )}/>

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
