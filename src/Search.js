import React, {Component } from 'react';
import {Link} from 'react-router-dom'
import Book from './Book'
import ToggleShelf from './ToggleShelf'
class Search extends Component {
    state = {  }
    render() { 
        let {books, showSearchPage, updateQuery, query, closeSearch, getBooks}=this.props
        console.log(getBooks)
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
    
                key={i}
                className="book-grid-item"
        
                >
                    <div className="book-top">
                        <div className="book-cover" 
                        style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                        </div>
                        <ToggleShelf />
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