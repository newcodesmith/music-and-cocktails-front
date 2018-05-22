import React, { Component } from 'react';
import './App.css';
import UserDrinkInfoCard from './UserDrinkInfoCard.jsx';


import SpotifyPlayer from 'react-spotify-player';

class UserAlbumCard extends Component {

    render() {
        const albumInfo = this.props.albumData;

        const size = {
            height: 270,
            width: 390,
        };
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'

        return (
            <div className="album-page">
                <div className="album-cover-top">

                    <div className="album-cover-title">
                        <h2>{albumInfo.artist}:</h2>
                        <h2>{albumInfo.album_title}</h2>
                        <div className="artist-pic">
                            <img src={albumInfo.artist_pic} alt="" height="200px" margin="auto" />
                            <div className="about-album">
                                <p>{albumInfo.album_info}</p>
                            </div>
                        </div>
                    </div>

                    <div className="drink-info">
                        <UserDrinkInfoCard
                            drinkInfo={albumInfo}
                        />                        
                        <SpotifyPlayer
                            uri={`spotify:album:${albumInfo.spotify_album_id}`}
                            size={size}
                            view={view}
                            theme={theme}
                        />
                    </div>

                </div>
            </div>

        )
    }

}

export default UserAlbumCard;