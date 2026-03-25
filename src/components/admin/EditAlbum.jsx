import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DrinkOptions from './DrinkOptions';
import { MESSAGE_TIMEOUT_MS } from '../../utils/constants';

function EditAlbum({ album, updateAlbum, refreshAlbums }) {
  const [fields, setFields] = useState({ ...album });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDrinkSelect = (option) => {
    setFields((prev) => ({ ...prev, album_drink_id: parseInt(option.value, 10) }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateAlbum(fields);
      await refreshAlbums();
      setMessage('Your album was updated');
    } catch {
      setMessage('Failed to update album. Please try again.');
    }
    setTimeout(() => setMessage(''), MESSAGE_TIMEOUT_MS);
  };

  return (
    <div className="album-detail-card">
      <h1>Update {album.genre} Album</h1>
      <div className="album-detail-card-form">
        <form className="album-input" onSubmit={handleSave}>
          <div className="edit-album-form-layout">
            <div className="edit-album-form-1">
              <label>Artist:</label>
              <input type="text" name="artist" onChange={handleChange} defaultValue={album.artist} />

              <label>Album Title:</label>
              <input type="text" name="album_title" onChange={handleChange} defaultValue={album.album_title} />

              <label>Album Info:</label>
              <textarea name="album_info" onChange={handleChange} defaultValue={album.album_info} />

              <label>Album Cover URL:</label>
              <textarea name="album_cover_url" onChange={handleChange} defaultValue={album.album_cover_url} />

              <div className="admin-pic-preview">
                <div className="admin-album-cover-container">
                  <h5>Album Cover Preview:</h5>
                  <div className="admin-album-image">
                    <img src={fields.album_cover_url} alt={album.album_title} />
                  </div>
                </div>
                <div className="admin-artist-photo-container">
                  <h5>Artist Photo Preview:</h5>
                  <div className="admin-artist-image">
                    <img src={fields.artist_pic} alt={album.artist} />
                  </div>
                </div>
              </div>

              <label>Artist Photo URL:</label>
              <textarea name="artist_pic" onChange={handleChange} defaultValue={album.artist_pic} />

              <label>Spotify Album ID:</label>
              <input type="text" name="spotify_album_id" onChange={handleChange} defaultValue={album.spotify_album_id} />
            </div>

            <div className="edit-album-form-1">
              <label>Change Paired Drink</label>
              <DrinkOptions
                drinkValue={fields.album_drink_id}
                updateDrinkSelection={handleDrinkSelect}
              />
            </div>
          </div>

          <div className="submit-buttons">
            <input type="submit" value="Update Album" />
          </div>
          <p className="message">{message}</p>
        </form>
      </div>
    </div>
  );
}

EditAlbum.propTypes = {
  album: PropTypes.shape({
    album_id: PropTypes.number,
    genre: PropTypes.string,
    artist: PropTypes.string,
    album_title: PropTypes.string,
    album_info: PropTypes.string,
    album_cover_url: PropTypes.string,
    artist_pic: PropTypes.string,
    spotify_album_id: PropTypes.string,
    album_drink_id: PropTypes.number,
  }).isRequired,
  updateAlbum: PropTypes.func.isRequired,
  refreshAlbums: PropTypes.func.isRequired,
};

export default EditAlbum;
