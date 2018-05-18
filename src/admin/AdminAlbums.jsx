import React, { Component } from "react";
import EditAlbum from "./EditAlbum.jsx"

class AdminAlbums extends Component {

    state = {
        albumsData: []
    };

    getAlbums = () => {
        const albumsUrl = "http://localhost:3000/albums";
        return fetch(albumsUrl)
            .then(response => response.json())
            .then(response => {
                this.setState({ albumsData: response });
            })
    }

    updateAlbumData = (album) => {
        let updateUrl = `http://localhost:3000/albums/${album.album_id}`;
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

    componentDidMount() {
        this.getAlbums();
    }

    render() {
        const albumAndDrink = this.state.albumsData;

        return (

            albumAndDrink.sort((a, b) => a.album_id - b.album_id)
                .map(data =>
                    <EditAlbum
                        key={data.album_id} {...data}
                        updateAlbumData={this.updateAlbumData}
                        getAlbums={this.getAlbums}

                    />
                )
        );
    }
}

export default AdminAlbums;