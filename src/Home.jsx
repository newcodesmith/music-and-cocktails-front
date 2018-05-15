import React, { Component } from 'react';
import './App.css';

import HomePageGenres from './HomePageGenres.jsx'

import queryString from "query-string"
import SpotifyPlayer from 'react-spotify-player';

class Home extends Component {

  constructor() {
    super()
    this.state = {
      userData: {},
      albumsData: []
    }
  }

  getAccessToken() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token

    fetch("https://api.spotify.com/v1/me", {
      headers: {"Authorization": "Bearer " + accessToken}
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      this.setState({
        userData: data
      })
    });
  }

  getAlbums() {
    const albumsUrl = "http://localhost:3000/albums";
    let albumsDataGrab = response => {
        this.setState({ albumsData: response });
    };
    return fetch(albumsUrl)
        .then(response => response.json())
        .then(albumsDataGrab)
}

    componentDidMount () {
      this.getAccessToken();
      this.getAlbums();
    }

  render() {

    return (
      <div className="App">
        <h1>Hello This is the home page</h1>
        <p>Some info about the site</p>
        <HomePageGenres 
        albumsData= {this.state.albumsData}
        userData= {this.state.userData}
        />

      </div>
    );
  }
}

export default Home;
