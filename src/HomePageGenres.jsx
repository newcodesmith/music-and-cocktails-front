import React, { Component, createRef, Fragment } from "react";

class HomePageGenres extends Component {
  state = {
    activeAlbumId: null,
    tooltipStyle: {},
  };

  tooltipRef = createRef();
  buttonRefs = {};

  showTooltip = (albumId) => {
    this.setState({ activeAlbumId: albumId }, () => {
      this.positionTooltip(albumId);
    });
  };

  hideTooltip = () => {
    this.setState({ activeAlbumId: null });
  };

  positionTooltip = (albumId) => {
    requestAnimationFrame(() => {
      const tooltip = this.tooltipRef.current;
      const button = this.buttonRefs[albumId];

      if (!tooltip || !button) return;

      const tooltipRect = tooltip.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const padding = 10;

      let top = buttonRect.bottom + padding;
      let left = buttonRect.left + buttonRect.width / 2 - tooltipRect.width / 2;

      // Clamp horizontally
      left = Math.max(
        padding,
        Math.min(left, window.innerWidth - tooltipRect.width - padding),
      );

      // Flip vertically if needed
      if (top + tooltipRect.height > window.innerHeight - padding) {
        top = buttonRect.top - tooltipRect.height - padding;
      }

      // Clamp vertically (absolute safety net)
      top = Math.max(
        padding,
        Math.min(top, window.innerHeight - tooltipRect.height - padding),
      );

      this.setState({
        tooltipStyle: {
          top: `${top}px`,
          left: `${left}px`,
        },
      });
    });
  };

  render() {
    const { albumsData } = this.props;
    const { activeAlbumId, tooltipStyle } = this.state;

    return (
      <Fragment>
        {albumsData
          .sort((a, b) => a.album_id - b.album_id)
          .map((albumData) => (
            <div key={albumData.genre} className="container">
              <div
                ref={(el) => (this.buttonRefs[albumData.album_id] = el)}
                onMouseEnter={() => this.showTooltip(albumData.album_id)}
                onMouseLeave={this.hideTooltip}
                onClick={this.props.openModal.bind(this, albumData.album_id)}
                className={`genre-button genre-button-${albumData.album_id}`}
              >
                </div>
                {activeAlbumId === albumData.album_id && (
                  <div
                    ref={this.tooltipRef}
                    className="album-title-popup"
                    style={tooltipStyle}
                  >
                    <h4>{albumData.genre} Album</h4>
                    <h3>
                      {`${albumData.artist} : "${albumData.album_title}"`}
                    </h3>
                  </div>
                )}
              
            </div>
          ))}
      </Fragment>
    );
  }
}

export default HomePageGenres;
