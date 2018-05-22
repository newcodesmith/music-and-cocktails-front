import React, { Component } from 'react';
import queryString from "query-string"
import UserAlbumCard from './UserAlbumCard';


class AlbumModal extends Component {

    state = {
        accessToken: queryString.parse(window.location.search).access_token,
        albumData: this.props.albumsData,
        userData: [],
        albumId: this.props.album_id
    };

    render() {
        const albumData = this.props.albumsData;
        const selectedAlbum = this.props.albumId;
        const singleAlbum = albumData.filter(album => {
            if (album.drink_id === selectedAlbum) {
                return album
            }
        })[0]
        return (
            <div className="album-modal" >
                <span className="close" onClick={this.props.closeModal.bind(this)}>Close</span>
                <div className="card">
                    <div className="content">
                        <div className={`front front-${singleAlbum && singleAlbum.album_id}`}>
                            <img src={singleAlbum && singleAlbum.album_cover_url} alt={singleAlbum && singleAlbum.album_title} height="800px" />
                        </div>
                        <div className={`back back-${singleAlbum && singleAlbum.album_id}`}>
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
        )
    }
}

export default AlbumModal;