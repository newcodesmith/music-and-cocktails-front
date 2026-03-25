import React from 'react';
import PropTypes from 'prop-types';
import EditAlbum from './EditAlbum';
import { updateAlbum } from '../../services/albumService';

function AdminAlbums({ albumsData, refreshAlbums }) {
  return albumsData
    .slice()
    .sort((a, b) => a.album_id - b.album_id)
    .map((album) => (
      <EditAlbum
        key={album.album_id}
        album={album}
        updateAlbum={updateAlbum}
        refreshAlbums={refreshAlbums}
      />
    ));
}

AdminAlbums.propTypes = {
  albumsData: PropTypes.array.isRequired,
  refreshAlbums: PropTypes.func.isRequired,
};

export default AdminAlbums;
