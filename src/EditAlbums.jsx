import React, { Component } from "react";

class EditAlbums extends Component {
    render() {
        const album = this.props.albumsData;
        const drink = this.props.drinksData;
        console.log(album);

        return (
            album.map(albumInfo => {
                return (
                    <div className="album-detail-card" >
                        <form className="album-input">
                            <label>Album ID:</label>
                            <input className="album-id" type="text" readOnly value={albumInfo.id} />
                            <label>Genre:</label>
                            <input type="text" defaultValue={albumInfo.genre} />
                            <label>Artist:</label>
                            <input type="text" defaultValue={albumInfo.artist} />
                            <label>Album Title:</label>
                            <input type="text" name="Album Title" defaultValue={albumInfo.album_title} />
                            <label>Album Info:</label>
                            <textarea type="text" name="Album Info" defaultValue={albumInfo.album_info} />
                            <label>Spotify Album ID:</label>
                            <input type="text" name="Spotify Album ID" defaultValue={albumInfo.spotify_album_id} />
                            <input id="update" type="submit" value="Update Album" />
                            <input id="delete" type="submit" value="Delete Album" />
                            <p className="message" />
                        </form>
                    </div>
                )
            })
        );
    }
}

export default EditAlbums;