import React, { Component } from 'react';
import DrinkOptions from "./DrinkOptions.jsx";

class EditAlbum extends Component {
    constructor() {
        super()
        this.state = {
            ...this.props,
            allDrinkInfo: null
        };

    }

    componentDidMount() {
        const newState = {
            ...this.state,
            ...this.props
        }
        this.setState(newState)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });

    }

    handleSave = (e) => {
        e.preventDefault();
        const updatedAlbumInfo = {
            album_id: this.state.album_id,
            genre: this.state.genre,
            artist: this.state.artist,
            album_title: this.state.album_title,
            album_info: this.state.album_info,
            album_cover_url: this.state.album_cover_url,
            spotify_album_id: this.state.spotify_album_id,
            album_drink_id: this.state.album_drink_id,
            accent_color: this.state.accent_color
        }

        this.props.updateAlbumData(updatedAlbumInfo)
            .then(() => this.props.getAlbums())
            .then(response => {
                this.setState({ message: "Your album was updated" })
                setTimeout(() => {
                    this.setState({ message: "" })
                }, 4000);
            })
    }

    updateDrinkSelection = (albumDrinkObject) => {
        const albumDrinkID = parseInt(albumDrinkObject.value)
        this.setState({ album_drink_id: albumDrinkID })
    }

    render() {
        return (
            <div className="album-detail-card" >
                <h1>Update {this.props.genre} Album</h1>
                <div className="album-detail-card-form">
                    <form
                        className="album-input"
                        onSubmit={this.handleSave}
                    >
                        <div className="edit-album-form-layout">
                            <div className="edit-album-form-1">
                                <div className="form-id-genre">
                                    <div className="form-id" hidden>
                                        <label>Album ID:</label>
                                        <input
                                            className="album-id"
                                            type="text"
                                            name='album_id'
                                            value={this.props.album_id}
                                        />
                                    </div>
                                    <div className="form-genre" hidden>
                                        <label>Genre:</label>
                                        <input
                                            type="text"
                                            name='genre'
                                            value={this.props.genre}
                                        />
                                    </div>
                                </div>

                                <label>Artist:</label>
                                <input
                                    type="text"
                                    name='artist'
                                    onChange={this.handleChange}
                                    defaultValue={this.props.artist}
                                />

                                <label>Album Title:</label>
                                <input
                                    type="text"
                                    name='album_title'
                                    onChange={this.handleChange}
                                    defaultValue={this.props.album_title}
                                />

                                <label>Album Info:</label>
                                <textarea
                                    type="text"
                                    name='album_info'
                                    onChange={this.handleChange}
                                    defaultValue={this.props.album_info}
                                />

                                <label>Album Cover URL:</label>
                                <textarea
                                    type="url"
                                    name='album_cover_url'
                                    onChange={this.handleChange}
                                    defaultValue={this.props.album_cover_url}
                                />

                                <div className="admin-album-cover-container">
                                    <h5>Album Cover Preview:</h5>
                                    <div className="admin-album-image">
                                        <img src={this.state.album_cover_url} alt={this.props.album_title} height="200px" />
                                    </div>
                                </div>

                                <label>Spotify Album ID:</label>
                                <input
                                    type="text"
                                    name='spotify_album_id'
                                    onChange={this.handleChange}
                                    defaultValue={this.props.spotify_album_id}
                                />
                            </div>

                            <div className="edit-album-form-1">
                                <label>Change Paired Drink</label>
                                <DrinkOptions
                                    name="album_drink_id"
                                    selected={this.state.album_drink_id}
                                    albumInfo={this.state}
                                    drinkValue={this.state.album_drink_id}
                                    handleChange={this.handleChange}
                                    updateDrinkSelection={this.updateDrinkSelection}
                                />

                            </div>

                        </div>

                        <div className="submit-buttons">
                            <input id="update-album" type="submit" value="Update Album" />
                        </div>

                        <p className="message">{this.state.message}</p>

                    </form>
                </div>

            </div>
        )
    }
}

export default EditAlbum;
