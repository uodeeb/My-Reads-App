import React, { Component } from 'react';
import ToggleShelf from './ToggleShelf'
class Book extends Component {
    state = {  }
    render() { 
      const {books, shelfGet, book, onBookUpdate}=this.props
        return (
          <li className="book"
          key={book.id}
          
          className="book-grid-item"

      >
        <div className="book-top">
            <div className="book-cover" 
            style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
            </div>
       <ToggleShelf 
       onToggleShelf={(book, shelf)=> this.props.onBookUpdate(book, shelf)}
       book={book}
       />
            </div>
        <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors}</div>
    </li>
          );
    }
}
 
export default Book;
