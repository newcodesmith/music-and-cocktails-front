import React, { Component } from "react";
import UserAlbumCard from "./UserAlbumCard";
import "./AlbumModal.css";

class AlbumModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      albumData: this.props.albumsData,
      userData: [],
      albumId: this.props.album_id,
    };
  }

  handleMouseEnter = () => {
    this.setState({ flipped: true });
  };

  handleMouseLeave = () => {
    this.setState({ flipped: false });
  };

  handleTouchStart = () => {
    this.setState((prevState) => ({
      flipped: !prevState.flipped,
    }));
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { flipped } = this.state;
    const albumData = this.props.albumsData;
    const selectedAlbum = this.props.albumId;
    const singleAlbum = albumData.filter((album) => {
      if (album.drink_id === selectedAlbum) {
        return album;
      } else {
        return null;
      }
    })[0];

    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        {/* <div className="close-button-container" onClick={onClose}>
          <span className="close">Close</span>
        </div> */}
        <div
          className="modal-square"
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onTouchStart={this.handleTouchStart}
        >
          <div className={`flip-card ${flipped ? "flipped" : ""}`}>
            <div className="flip-card-front">
              <div
                className={`front front-${singleAlbum && singleAlbum.album_id}`}
              >
                <img
                  src={singleAlbum && singleAlbum.album_cover_url}
                  alt={singleAlbum && singleAlbum.album_title}
                />
              </div>
              <div className="modal-click-me">Click Cover</div>
            </div>

            <div className="flip-card-back">
              <div
                className={`back back-${singleAlbum && singleAlbum.album_id}`}
              >
                <div className="album-modal-container">
                  <UserAlbumCard
                    getAlbum={this.getAlbum}
                    getUserData={this.getUserData}
                    albumData={singleAlbum}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlbumModal;
