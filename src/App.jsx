import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'

export default class App extends React.Component {

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <SearchBar /> */}
          <div className="App-playlist">
            {/* <SearchResult /> */}
            {/* <Playlist /> */}
          </div>
        </div>
      </div>
    )
  }
  
}
