import React, {Component } from 'react';
import {Link} from 'react-router-dom'
import ToggleShelf from './ToggleShelf'
class Search extends Component {

    render() { 
        let {query, getBooks}=this.props

        return ( 
            <div className="search-books">
            <div className="search-books-bar">
              <Link  
                  to="/" 
                  className="close-search" 
                  onClick={()=> this.closeSearch()}
              >Close
              </Link>
              <div className="search-books-input-wrapper">
                  <input 
                      type="text" 
                      placeholder="Search by title or author"
                      value={query}
                      onChange={(event)=> this.props.updateQuery(event.target.value)}
                  />
              </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                {getBooks.map((book, i)=>(
                    <li 
                    key={book.id}
                    className="book-grid-item"
                    >
                    <div className="book-top">
                        <div 
                        className="book-cover" 
                        style={{ 
                            width: 128, 
                            height: 193, 
                            backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})`: '' }}
                        >
                        </div>
                            <ToggleShelf 
                                onToggleShelf={(book, shelf)=> this.props.onShelfUpdate(book, shelf)}
                                book={book}
                            />
                        </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                    </li>  
        ))}
              </ol>
            </div>
          </div>
         )
    }
}
 
export default Search;