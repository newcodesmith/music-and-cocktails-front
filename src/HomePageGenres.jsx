import React, { Component } from 'react';
import { render } from "react-dom";
import queryString from "query-string"
import AlbumAndDrinkPage from './AlbumAndDrinkPage';

class HomePageGenres extends Component {

    render() {
        let parsed = queryString.parse(window.location.search)
        let accessToken = parsed.access_token
        const albumsData = this.props.albumsData;
        return (
            albumsData.sort((a, b) => a.album_id - b.album_id).map(albumData => {
                return (
                    <div key={albumData.genre} id={`${albumData.genre}-container`} className="container">"
                            <div className='container'>
                            <div className={`genre-button genre-button-${albumData.album_id}`}>
                                <div className="album-title-popup">
                                    <h4>{albumData.genre} Album</h4>
                                    <h3>{`${albumData.artist} : "${albumData.album_title}"`}</h3>
                                </div>
                            </div>

                            {/* <div className="album-modal">
                                <div className="card">
                                    <div className="content">
                                        <div className={`front front-${albumData.album_id}`}>
                                            <img src={albumData.album_cover_url} alt={albumData.album_title} height="800px" />
                                        </div>
                                        <div className={`back back-${albumData.album_id}`}>
                                            <div className="album-modal-container">
                                                <AlbumAndDrinkPage
                                                    albumId={albumData}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                    </div>
                )
            })
        )
    }

}

export default HomePageGenres;