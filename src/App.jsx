import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import { SearchBar } from './components/SearchBar/SearchBar'
import { SearchResult } from './components/SearchResults/SearchResults'
import { Playlist } from './components/Playlist/Playlist'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      searchResults : [
        {
              name : 'title1',
              artist: 'artist1',
              album : 'album1',
              id: 1
            },
        {
              name : 'title2',
              artist: 'artist2',
              album : 'album2',
              id: 2
            },
        {
              name : 'title3',
              artist: 'artist3',
              album : 'album3',
              id: 3
            }
        ],
            playlistName : 'lofi',
            playlistTracks : [
          {
              name : 'lofi1',
              artist: 'artist1',
              album : 'album1',
              id: 4
              },
          {
              name : 'lofi2',
              artist: 'artist2',
              album : 'album2',
              id: 5
              }
        ]
      }
      this.addTrack = this.addTrack.bind(this)
      this.removeTrack = this.removeTrack.bind(this)
      this.updatePlaylistName= this.updatePlaylistName.bind(this)
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

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResult searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              />
          </div>
        </div>
      </div>
    )
  }
  
}
