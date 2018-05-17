import React, { Component } from "react";
import EditAlbum from "./EditAlbum.jsx"

class AdminAlbums extends Component {

    state = {
        albumsData: []
    };

    getAlbums = () => {
        const albumsUrl = "http://localhost:3000/albums";
        let albumsDataGrab = response => {
            this.setState({ albumsData: response });
        };
        return fetch(albumsUrl)
            .then(response => response.json())
            .then(albumsDataGrab)
    }

    updateAlbumData(album) {
        console.log("Admin Album info", album);
        
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

    // deleteAlbumData(theId) {
    //     let thisId = theId;
    //     let deleteUrl = `http://localhost:3000/albums/${thisId}`;

    //     return fetch(deleteUrl, {
    //         method: "DELETE",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     }).catch(err => console.log(err));
    // }

    // _onClick = (e) => {
    //     e.preventDefault();
    //     if (e.target.id === "update") {
    //         let theId = this.album_id.value;
    //         let daData = this.getFormData(e);
    //         this.updateAlbumData(daData, theId)
    //             .then(() => this.getAlbums())
    //             .then(response => {
    //                 this.setState({ message: "Your album was updated" })
    //                 setTimeout(() => {
    //                     this.setState({ message: "" })
    //                 }, 4000);
    //             })
    //     } else if (e.target.id === "delete") {
    //         let theId = this.album_id.value;
    //         this.deleteAlbumData(theId)
    //             .then(() => this.getAlbums());
    //     }
    // }

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