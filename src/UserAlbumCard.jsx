import React, { Component } from 'react';
import './App.css';

import SpotifyPlayer from 'react-spotify-player';

class UserAlbumCard extends Component {
    state = {
        // spotifyAlbumData: []
    };

    // getSpotifyData() {
    //     const albumInfo = this.props.albumData;
    //     const accessToken = this.props.accessToken;
    //     const userData = this.props.userData;

    //     const spotifyUrl = `https://api.spotify.com/v1/albums/"42oBdomfxF0DbKKMEqrnQW?market=US}`;
    //     let spotifyDataGrab = response => {
    //         this.setState({ spotifyAlbumData: response });
    //     };
    //     fetch(spotifyUrl, {
    //       headers: {"Authorization": "Bearer " + accessToken}
    //     })
    //     .then(response => {
    //       return response.json()
    //     })
    //     .then(response => response.json())
    //     .then(spotifyDataGrab)
    //     .catch(err => console.error(err));
    // }

    // componentDidMount() {
    //     const userData = this.props.userData;

    //     if(this.props.Object.keys(userData).length === 0){
    //         return
    //     } 
    //     const newState = {
    //         ...this.state,
    //         ...this.props
    //     }
    //     this.setState(newState)
    //     this.getSpotifyData();
    // }

    render() {
        const albumInfo = this.props.albumData;

        const size = {
            width: '50%',
            height: 400,
        };
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'

        return (
            <div>
                <h1>{albumInfo.genre}</h1>
                <div className="album-cover-info">
                    <div className="flip-container">
                        <div className="flipper">
                            <div className={`front front-${albumInfo.album_id}`}>
                                <h1>{albumInfo.artist}:</h1>
                                <h1>{albumInfo.album_title}</h1>
                            </div>
                            <div className={`back back-${albumInfo.album_id}`}>
                                <img src={albumInfo.album_cover_url} alt={albumInfo.album_title} />
                            </div>
                        </div>
                    </div>
                    <div className="about-album">
                        <h2>About the album</h2>
                        <p>{albumInfo.album_info}</p>
                    </div>
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