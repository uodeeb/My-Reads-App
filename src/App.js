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
      this.setState({getBooks})
    }
  }

  render() {
    let {showSearchPage, updateQuery, query}=this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Route exact path="/search" render={()=>(
           <Search 
           showSearchPage={showSearchPage}
           updateQuery={this.updateQuery} 
           query={query} />
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
               <Shelf />
               <Shelf />
               <Shelf />
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
