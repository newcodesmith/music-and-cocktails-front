import React, { Component } from 'react';
import queryString from "query-string"
import './App.css';

import HomePageGenres from './HomePageGenres.jsx'
import AlbumModal from './AlbumModal.jsx';
import Footer from './Footer.jsx';

class Home extends Component {

  state = {
    userData: {},
    albumsData: [],
    album_id: null,
    isShown: false,
  };

  getAccessToken() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token

    fetch("https://api.spotify.com/v1/me", {
      headers: { "Authorization": "Bearer " + accessToken }
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
    const albumsUrl = "https://music-and-cocktails-api.herokuapp.com/albums";
    let albumsDataGrab = response => {
      this.setState({ albumsData: response });
    };
    return fetch(albumsUrl)
      .then(response => response.json())
      .then(albumsDataGrab)
  }

  openModal = (albumId) => {
    this.setState({ album_id: albumId });
    this.setState({ isShown: !this.state.isShown });
  }

  closeModal = (event) => {
    this.setState({ isShown: false });
  }

  componentDidMount() {
    this.getAlbums();
  }

  render() {

    return (
      <div className="home-page">
        
        <img className="home-page-pic" src={require('./assets/record-collection-1.jpg')} alt="" />

        <HomePageGenres
          albumsData={this.state.albumsData}
          userData={this.state.userData}
          openModal={this.openModal}
        />
        {this.state.isShown ?

          <AlbumModal
            albumsData={this.state.albumsData}
            albumId={this.state.album_id}
            closeModal={this.closeModal}
          /> : null}
          <Footer />
      </div>
    );
  }
}

export default Home;
