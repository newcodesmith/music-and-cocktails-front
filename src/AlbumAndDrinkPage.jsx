import React, { Component } from 'react';
import './App.css';

import queryString from "query-string"
import SpotifyPlayer from 'react-spotify-player';
import UserDrinkInfoCard from './UserDrinkInfoCard.jsx';

class AlbumAndDrinkPage extends Component {
    state = {
        albumId: this.props.location.state,
        accessToken: queryString.parse(window.location.search).access_token,
        albumData: []
    };

    getAlbum() {
        const albumId = this.state.albumId;
        const albumUrl = `http://localhost:3000/albums/${albumId}`;
        let albumDataGrab = response => {
            this.setState({ albumData: response });
        };
        return fetch(albumUrl)
            .then(response => response.json())
            .then(albumDataGrab)
    };

    componentDidMount() {
        this.getAlbum();
    }

    render() {
        const albumId = this.state.albumId;
        return (
            <div>
                <h1>This is the Album and Drink Page</h1>
                <h2>{albumId}</h2>
                <UserDrinkInfoCard 
                drinkInfo= {this.state.albumData}
                />
            </div>
        )
    }

}

export default AlbumAndDrinkPage;