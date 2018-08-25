import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom'
import Search from './Search'
import Shelf from './Shelf'
import './App.css'
import PropTypes from 'prop-types'

class BooksApp extends React.Component {
  state = {
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


// put books in relevant shelf
shelfGet = (name)=>{
  return this.state.books.filter((book) => book.shelf === name)
}

shelfUpdate = (book, shelf) => {

  let books;
  if(this.state.books.findIndex(b=> b.id === book.id)> 0){
    books=this.state.books.map(b=>{
      if(b.id === book.id){
          return {...book, shelf}
      }else{
          return b
      }
    })

  }else{
    books=[...this.state.books, {...book, shelf}]
  }
  this.setState({books})
  BooksAPI.update(book, shelf)
  .then((data)=>{

  })
}


//main render func
  render() {

    const {books, showSearchPage, query,getBooks}=this.state
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
                  onShelfUpdate={(book, shelf)=>this.shelfUpdate(book, shelf)}
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
                          shelfGet={this.shelfGet}
                          onShelfUpdate={(book, shelf)=>this.shelfUpdate(book, shelf)}
                      />
                      <Shelf 
                          title="Want to Read"
                          books={this.shelfGet("wantToRead")} 
                          shelfGet={this.shelfGet}
                          onShelfUpdate={(book, shelf)=>this.shelfUpdate(book, shelf)}
                      />
                      <Shelf 
                          title="Read"
                          books={this.shelfGet("read")}
                          shelfGet={this.shelfGet}
                          onShelfUpdate={(book, shelf)=>this.shelfUpdate(book, shelf)}
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

// add proptype 
App.propTypes = {
  showSearchPage: PropTypes.bool,
    books: PropTypes.array,
    query: PropTypes.string,
}
export default BooksApp
