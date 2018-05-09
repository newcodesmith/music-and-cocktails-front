import React, { Component } from "react";
import EditAlbums from "./EditAlbums.jsx";

class AdminEvents extends Component {
  constructor() {
    super();
    this.state = {
      albumsData: [],
      drinksData: []
    };
  }

  getAlbums() {
    const albumsUrl = "https://music-and-cocktails-api.herokuapp.com/albums";
    let albumsDataGrab = response => {
      this.setState({ albumsData: response });
    };
    return fetch(albumsUrl)
      .then(response => response.json())
      .then(albumsDataGrab)
      .catch();
  }

  getDrinks() {
    const drinksUrl = "https://music-and-cocktails-api.herokuapp.com/drinks";
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
        </div>
      </div>
    );
  }
}

export default AdminEvents;
