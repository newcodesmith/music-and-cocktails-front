import React, { Component } from "react";
import EditAlbums from "./EditAlbums.jsx";
import AddAlbum from "./AddAlbum.jsx";

class AdminEvents extends Component {
  constructor() {
    super();
    this.state = {
      albumsData: [],
      drinksData: [],
    };
  }

  getAlbums() {
    const albumsUrl = "http://localhost:3000/albums";
    let albumsDataGrab = response => {
      this.setState({ albumsData: response });
    };
    return fetch(albumsUrl)
      .then(response => response.json())
      .then(albumsDataGrab)
      .catch();
  }

  getDrinks() {
    const drinksUrl = "http://localhost:3000/drinks";
    let drinksDataGrab = response => {
      this.setState({ drinksData: response });
    };
    return fetch(drinksUrl)
      .then(response => response.json())
      .then(drinksDataGrab)
      .catch();
  }

  componentDidMount() {
    this.getAlbums();
    this.getDrinks();
  }

  render() {
    return (
      <div>
        <h1 className="admin-heading">Admin Panel</h1>
        <div>
          <h1>Albums</h1>
          <EditAlbums
            albumsData={this.state.albumsData}
            drinkData={this.state.drinkData}
          />
          <AddAlbum
            albumsData={this.state.albumsData}
          />
        </div>
      </div>
    );
  }
}

export default AdminEvents;
