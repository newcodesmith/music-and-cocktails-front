import React, { Component, Fragment } from "react";
import "./App.css";

import HomePageGenres from "./HomePageGenres.jsx";
import Footer from "./Footer.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import AlbumModal from "./AlbumModal.jsx";

class Home extends Component {
  state = {
    userData: {},
    albumsData: [],
    album_id: null,
    isShown: false,
    isModalOpen: false,
  };

  async getAlbums() {
    // const albumsUrl = "https://music-and-cocktails-api-e2b71b349cc8.herokuapp.com/albums";
    const albumsUrl = "https://music-and-cocktails-api-1c87360d2e0b.herokuapp.com/albums";

    try {
      const response = await fetch(albumsUrl);
      const data = await response.json();
      this.setState({ albumsData: data });
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  }

  openModal = (albumId) => {
    this.setState({ album_id: albumId });
    this.setState({ isShown: !this.state.isShown });
    this.setState({ isModalOpen: true });
  };

  closeModal = (event) => {
    this.setState({ isShown: false });
    this.setState({ isModalOpen: false });
  };

  componentDidMount() {
    this.getAlbums();
  }

  render() {
    return (
      <div className="home-page">
        {this.state.albumsData && this.state.albumsData.length > 0 ? (
          <Fragment>
            <img
              className="home-page-pic"
              src={require("./assets/record-collection-1.jpg")}
              alt=""
            />

            <HomePageGenres
              albumsData={this.state.albumsData}
              userData={this.state.userData}
              openModal={this.openModal}
            />
            {this.state.isShown ? (
              <AlbumModal
                isOpen={this.state.isModalOpen}
                onClose={this.closeModal}
                albumsData={this.state.albumsData}
                albumId={this.state.album_id}
                closeModal={this.closeModal}
              />
            ) : null}
          </Fragment>
        ) : (
          <LoadingScreen />
        )}

        <Footer />
      </div>
    );
  }
}

export default Home;
