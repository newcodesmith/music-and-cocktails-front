import React, { Component } from 'react';
import './App.css';

import SpotifyPlayer from 'react-spotify-player';

class UserAlbumCard extends Component {
    state = {
        ...this.props,       
        spotifyAlbumData: []
    };

    getSpotifyData() {
        const albumInfo = this.state.albumData;
        const accessToken = this.state.accessToken;
        const userData = this.state.userData;

        const spotifyUrl = `https://api.spotify.com/v1/albums/${albumInfo.spotify_album_id}?market=${userData.country}`;
        console.log(spotifyUrl);
        

        let spotifyDataGrab = response => {
            this.setState({ spotifyAlbumData: response });
        };
        return fetch(spotifyUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(spotifyDataGrab)
            .catch(err => console.error(err));
    };

    componentDidMount() {
        this.getSpotifyData();
    }

    render() {
        
        const albumInfo = this.state.albumData;
        
        const size = {
            width: '50%',
            height: 300,
        };
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'

        return (
            <div>
                <div>
                    <h1>This months {albumInfo.genre} album is "{albumInfo.album_title}" by {albumInfo.artist}</h1>
                    <h2>About the album</h2>
                    <p>{albumInfo.album_info}</p>
                </div>
                <div>
                    <SpotifyPlayer
                        uri={`spotify:album:${albumInfo.spotify_album_id}`}
                        size={size}
                        view={view}
                        theme={theme}
                    />
                </div>
            </div>
        )
    }

}

export default UserAlbumCard;