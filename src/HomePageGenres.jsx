import React, { Component } from 'react';
import queryString from "query-string"

class HomePageGenres extends Component {
    state = {
        album_id: null,
        isShown: false,
    };

    render() {
        let parsed = queryString.parse(window.location.search)
        let accessToken = parsed.access_token
        const albumsData = this.props.albumsData;
        return (
            albumsData.sort((a, b) => a.album_id - b.album_id).map(albumData => {
                return (
                    <div key={albumData.genre} id={`${albumData.genre}-container`} className="container">"
                            <div className='container'>
                            <div onClick={this.props.openModal.bind(this, albumData.album_id)} className={`genre-button genre-button-${albumData.album_id}`}>
                                <div className="album-title-popup">
                                    <h4>{albumData.genre} Album</h4>
                                    <h3>{`${albumData.artist} : "${albumData.album_title}"`}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

}

export default HomePageGenres;