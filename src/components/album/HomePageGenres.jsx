import React, { useState, useRef, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';

function HomePageGenres({ albumsData, openModal }) {
  const [activeAlbumId, setActiveAlbumId] = useState(null);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const tooltipRef = useRef(null);
  const buttonRefs = useRef({});

  const positionTooltip = useCallback((albumId) => {
    requestAnimationFrame(() => {
      const tooltip = tooltipRef.current;
      const button = buttonRefs.current[albumId];
      if (!tooltip || !button) return;

      const tooltipRect = tooltip.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const padding = 10;

      let top = buttonRect.bottom + padding;
      let left = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;

      left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));

      if (top + tooltipRect.height > window.innerHeight - padding) {
        top = buttonRect.top - tooltipRect.height - padding;
      }
      top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));

      setTooltipStyle({ top: `${top}px`, left: `${left}px` });
    });
  }, []);

  const showTooltip = useCallback((albumId) => {
    setActiveAlbumId(albumId);
    positionTooltip(albumId);
  }, [positionTooltip]);

  const hideTooltip = useCallback(() => setActiveAlbumId(null), []);

  return (
    <Fragment>
      {albumsData
        .slice()
        .sort((a, b) => a.album_id - b.album_id)
        .map((albumData) => (
          <div key={albumData.album_id} className="container">
            <button
              ref={(el) => (buttonRefs.current[albumData.album_id] = el)}
              onMouseEnter={() => showTooltip(albumData.album_id)}
              onMouseLeave={hideTooltip}
              onClick={() => openModal(albumData.album_id)}
              className={`genre-button genre-button-${albumData.album_id}`}
              aria-label={`${albumData.genre}: ${albumData.artist} – ${albumData.album_title}`}
            />
            {activeAlbumId === albumData.album_id && (
              <div
                ref={tooltipRef}
                className="album-title-popup"
                style={tooltipStyle}
                role="tooltip"
              >
                <h4>{albumData.genre} Album</h4>
                <h3>{`${albumData.artist} : "${albumData.album_title}"`}</h3>
              </div>
            )}
          </div>
        ))}
    </Fragment>
  );
}

HomePageGenres.propTypes = {
  albumsData: PropTypes.arrayOf(
    PropTypes.shape({
      album_id: PropTypes.number.isRequired,
      genre: PropTypes.string,
      artist: PropTypes.string,
      album_title: PropTypes.string,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default HomePageGenres;
