import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserAlbumCard from './UserAlbumCard';
import '../../styles/AlbumModal.scss';
import { findById } from '../../utils/dataTransformers';

function AlbumModal({ isOpen, onClose, albumsData, albumId }) {
  const [flipped, setFlipped] = useState(false);

  if (!isOpen) return null;

  const singleAlbum = findById(albumsData, albumId, 'drink_id');

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Album details"
    >
      <div
        className="modal-square"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
          <div
            className="flip-card-front"
            onTouchStart={() => setFlipped((f) => !f)}
          >
            <div className={`front front-${singleAlbum && singleAlbum.album_id}`}>
              <img
                src={singleAlbum && singleAlbum.album_cover_url}
                alt={singleAlbum && singleAlbum.album_title}
              />
            </div>
          </div>

          <div className="flip-card-back">
            <div className={`back back-${singleAlbum && singleAlbum.album_id}`}>
              <div className="album-modal-container">
                <UserAlbumCard albumData={singleAlbum} />
              </div>
            </div>
          </div>
        </div>

        <button
          className="modal-click-me"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? 'Click to see cover' : 'Click for details'}
        >
          {flipped ? 'Click to see cover' : 'Click for details'}
        </button>
      </div>
    </div>
  );
}

AlbumModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  albumsData: PropTypes.array.isRequired,
  albumId: PropTypes.number,
};

export default AlbumModal;
