import React, { Component } from 'react';
import './App.css';

import queryString from "query-string"
import SpotifyPlayer from 'react-spotify-player';

class AlbumAndDrinkPage extends Component {


    state = {
        albumId: this.props.location.state,
        accessToken: queryString.parse(window.location.search).access_token
    }

    render() {
        const albumId = this.state.albumId;
        return (
            <div>
                <h1>This is the Album and Drink Page</h1>
                <h2>{albumId}</h2>
            </div>
        )
    }

}

export default AlbumAndDrinkPage;