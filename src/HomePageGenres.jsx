import React, { Component } from 'react';
import { Link } from "react-router-dom";
import queryString from "query-string"


class HomePageGenres extends Component {


    render() {
        let parsed = queryString.parse(window.location.search)
        let accessToken = parsed.access_token
        const albumsData = this.props.albumsData;
        return (
            albumsData.map(albumData => {
                return (
                    <div key={albumData.genre}>
                        <h1>{albumData.genre}</h1>
                        <h3>This months {albumData.genre} pick is "{albumData.album_title}" by {albumData.artist}.</h3>
                        <h3>Were have paired a {albumData.drink_title} with this album.</h3>
                        <p>Click here to listen and learn more.</p>

                        <Link to={{
                            pathname: `/${albumData.genre}`,
                            search: `?access_token=${accessToken}`,
                            state: `${albumData.album_id}`
                        }}>
                            <button
                                type="button"
                                className="genre-button"
                            >{albumData.genre}</button>

                        </Link>

                    </div>
                )
            })
        )
    }

}

export default HomePageGenres;