import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom'
import Search from './Search'
import Shelf from './Shelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    query: ''
  }
  // react did mount function 
  componentDidMount() {
    BooksAPI.getAll().then(books =>{
      this.setState({books})
    })
    this.updateQuery()
    //this.shelfGet()
  }
  // this will update the query from api
  updateQuery = (query)=>{
    this.setState({query: query})
    let getBooks= []
    if(query){
      BooksAPI.search(query).then(response =>{
        if(response.length){
          getBooks= response.map(book =>{
            const i =this.state.books.findIndex(key => key.id === book.id)
            if(i > 0){
              return this.state.books[i]
            }else{
              return book
            }
          })
        }
        this.setState({getBooks})
      })
    }
    else{
      this.setState({getBooks: []})
    }
  }

// close search page func
closeSearch = () => {
  this.setState({ showSearchPage: false })
}
/////////////////////
shelfGet = (name)=>{
  return this.state.books.filter((book) => book.shelf === name)
}

changeShelf = (book, newShelf) => {
  BooksAPI.update(book, newShelf).then(() => {
      // Update the local copy of the book
      book.shelf = newShelf;

      // Filter out the book and append it to the end of the list
      // so it appears at the end of whatever shelf it was added to.
      this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }));
  });
};
////////////////////
  render() {

    const {books, showSearchPage, updateQuery, query, closeSearch, getBooks}=this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Route exact path="/search" render={()=>(
           <Search 
           showSearchPage={showSearchPage}
           updateQuery={this.updateQuery} 
           query={query} 
           closeSearch={this.closeSearch}
           getBooks={getBooks}
           books={books}
           />
          )} 
          />
          
        ) : (
          <Route exact path="/" render={()=>(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
               <Shelf 
               title="Currently Reading"
               books={this.shelfGet("currentlyReading")}
               //books={books}
                shelfGet={this.shelfGet}
               />
               <Shelf 
               title="Want to Read"
               books={this.shelfGet("wantToRead")}
               //books={books}
               shelfGet={this.shelfGet}
               />
               <Shelf 
               title="Read"
               books={this.shelfGet("read")}
               //books={books}
               shelfGet={this.shelfGet}
               />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
            </div>
          </div>
          )} 
          />
          



        )}
      </div>
    )
  }
}

export default BooksApp
