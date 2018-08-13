import React, { Component } from 'react'
import './Book.css'

class Book extends Component {

updateShelf = (e) => {
    //call function passed down. Information passed back to App.js
    this.props.sortMe(this.props.bookObject, e.target.value)  
}

 render() {
     return <div className="book" id={this.props.bookID}>
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url(' + this.props.bookURL + ')'}}></div>
                <div className="book-shelf-changer">
                    <select onChange={this.updateShelf} value={this.props.bookShelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading"> Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.bookTitle}</div>
                <div className="book-authors"> 
                    
                </div>
            </div>
 }
}

export default Book