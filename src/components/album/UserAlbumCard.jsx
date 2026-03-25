import React from 'react';
import PropTypes from 'prop-types';
import SpotifyPlayer from 'react-spotify-player';
import '../../styles/App.scss';
import UserDrinkInfoCard from './UserDrinkInfoCard';

const spotifySize = { height: '155px', width: '100%' };

function UserAlbumCard({ albumData }) {
  if (!albumData) return null;

  return (
    <div className="album-page">
      <div className="album-cover-top">
        <div className="album-cover-title">
          <h2>{albumData.artist}:</h2>
          <h2>{albumData.album_title}</h2>
          <div className="artist-pic">
            <img src={albumData.artist_pic} alt={albumData.artist} />
            <div className="about-album">
              <p>{albumData.album_info}</p>
            </div>
          </div>
        </div>

        <div className="drink-info-container">
          <UserDrinkInfoCard drinkInfo={albumData} />
          <SpotifyPlayer
            uri={`spotify:album:${albumData.spotify_album_id}`}
            size={spotifySize}
            view="list"
            theme="black"
          />
        </div>
      </div>
    </div>
  );
}

UserAlbumCard.propTypes = {
  albumData: PropTypes.shape({
    artist: PropTypes.string,
    album_title: PropTypes.string,
    artist_pic: PropTypes.string,
    album_info: PropTypes.string,
    spotify_album_id: PropTypes.string,
    drink_title: PropTypes.string,
    drink_description: PropTypes.string,
    drink_pic_url: PropTypes.string,
    ingredients: PropTypes.string,
    direction: PropTypes.string,
  }),
};

export default UserAlbumCard;
