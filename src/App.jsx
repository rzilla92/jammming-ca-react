import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import { SearchBar } from './components/SearchBar/SearchBar'
import { SearchResult } from './components/SearchResults/SearchResults'
import { Playlist } from './components/Playlist/Playlist'
import Spotify from './util/Spotify'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults : [],
      playlistName : 'lofi',
      playlistTracks : []
      }

      this.addTrack = this.addTrack.bind(this)
      this.removeTrack = this.removeTrack.bind(this)
      this.updatePlaylistName= this.updatePlaylistName.bind(this)
      this.savePlaylist=this.savePlaylist.bind(this)
      this.search= this.search.bind(this)
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track)
    this.setState({playlistTracks: tracks})
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id )
    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackUris)
      .then(() => {this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term)
      .then(searchResults => {
        this.setState({
          searchResults: searchResults
        })
      })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch = {this.search}
          />
          <div className="App-playlist">
            <SearchResult searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} 
              onSave={this.savePlaylist}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              />
          </div>
        </div>
      </div>
    )
  }
  
}
