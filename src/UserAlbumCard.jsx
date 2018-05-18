import React, { Component } from 'react';
import './App.css';

import SpotifyPlayer from 'react-spotify-player';

class UserAlbumCard extends Component {

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