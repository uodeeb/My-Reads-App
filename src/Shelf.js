import React, { Component } from 'react';
import Book from './Book'
class Shelf extends Component {
    state = {  }
    render() { 
      const {books, shelfGet, title, onShelfUpdate}=this.props
        return (
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.map((book)=>(
                      <Book 
                      shelfGet={shelfGet} 
                      key={book.id}
                      book={book}
                      onBookUpdate={(book, shelf)=>this.props.onShelfUpdate(book, shelf)}
                      />
                    ))} 
                   
                    </ol>
                  </div>
                </div>
          );
    }
}
 
export default Shelf;

