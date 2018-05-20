import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';
import './App.css';

import SpotifyPlayer from 'react-spotify-player';

class UserAlbumCard extends Component {

    render() {
        const albumInfo = this.props.albumData;
        const artistPic = albumInfo.artist_pic

        const size = {
            width: '50%',
            height: 400,
        };
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'

        return (
            <div className="album-page">
                <h1>{albumInfo.genre}</h1>
                <div className="album-cover-info">
                    <div className="card">
                        <div className="content">
                            <div className={`front front-${albumInfo.album_id}`}>
                                <h1>{albumInfo.artist}:</h1>
                                <h1>{albumInfo.album_title}</h1>
                            </div>
                            <div className={`back back-${albumInfo.album_id}`}>
                                <img src={albumInfo.album_cover_url} alt={albumInfo.album_title} height="400px" />
                            </div>
                        </div>
                    </div>
                    <div className="about-album">
                        <h2>About the album</h2>
                        <p>{albumInfo.album_info}</p>
                    </div>
                </div>

                <Parallax
                    bgImage="https://media.npr.org/assets/img/2012/05/04/beach-boys-smile_wide-6ae78c4cec7d903ab967271072e727a5cd07a060-s900-c85.jpg"
                    bgImageAlt="turntable"
                    strength={-175}
                >

                    <div style={{ height: '200px' }} />
                </Parallax>
                {/* <div className="artist-pic-container">
                    <img src={albumInfo.artist_pic} alt={albumInfo.artist} />
                </div> */}
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