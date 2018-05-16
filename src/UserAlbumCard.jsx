import React, { Component } from 'react';
import './App.css';

import SpotifyPlayer from 'react-spotify-player';

class UserAlbumCard extends Component {
    state = {
        ...this.props,
        spotifyAlbumData: []
    };

    getSpotifyData() {
        const albumInfo = this.props.albumData;
        const accessToken = this.props.accessToken;
        const userData = this.props.userData;

        const spotifyUrl = `https://api.spotify.com/v1/albums/42oBdomfxF0DbKKMEqrnQW?market=US}`;
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
        const albumInfo = this.props.albumData;


        // if (albumInfo.length > 1) {
        // } else {
        //     this.setState(...this.props)
        //     this.getSpotifyData();
        //     console.log("did this run?");

        // }


        const size = {
            width: '50%',
            height: 400,
        };
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'

        return (
            <div>
                <h1>{albumInfo.genre}</h1>
                <div className="album-cover-info ">
                    <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
                        <div className="flipper">
                            <div className={`front front-${albumInfo.album_id}`}>
                                <h1>{albumInfo.artist}:</h1>
                                <h1>{albumInfo.album_title}</h1>
                            </div>
                            <div className={`back back-${albumInfo.album_id}`}>
                                <img src="https://is1-ssl.mzstatic.com/image/thumb/Music7/v4/23/ab/8a/23ab8ab2-a0d4-d824-7b0d-5532df236f12/UMG_cvrart_00602547305732_01_RGB72_1500x1500_13UABIM03512.jpg/1200x630bb.jpg" alt={albumInfo.album_title} />
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