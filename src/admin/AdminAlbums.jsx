import React, { Component } from "react";
import EditAlbum from "./EditAlbum.jsx"

class AdminAlbums extends Component {
    updateAlbumData = (album) => {        
        // let updateUrl = `https://https://music-and-cocktails-api-e2b71b349cc8.herokuapp.com/albums/${album.album_id}`;
        let updateUrl = `https://music-and-cocktails-api-1c87360d2e0b.herokuapp.com/albums/${album.album_id}`;
        return fetch(updateUrl, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(album)
        })
            .then(response => response.json())
            .catch(err => console.error(err));
    }

    render() {
        const albumAndDrink = this.props.albumsData ? this.props.albumsData : [];
        const getAlbums = this.props.getAlbums;

        return (

            albumAndDrink.sort((a, b) => a.album_id - b.album_id)
                .map(data =>
                    <EditAlbum
                        key={data.album_id} {...data}
                        updateAlbumData={this.updateAlbumData}
                        getAlbums={getAlbums}

                    />
                )
        );
    }
}

export default AdminAlbums;