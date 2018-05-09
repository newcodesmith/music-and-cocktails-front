import React, { Component } from "react";

class EditAlbums extends Component {
    constructor() {
        super();

        this._onClick = this._onClick.bind(this);
    }

    getFormData(e) {
        return {
            genre: e.target.parentNode.querySelectorAll("input")[1].value,
            artist: e.target.parentNode.querySelectorAll("input")[2].value,
            album_title: e.target.parentNode.querySelectorAll("input")[3].value,
            album_info: e.target.parentNode.querySelectorAll("input")[4].value,
            spotify_album_id: e.target.parentNode.querySelectorAll("input")[5].value,
        };
    }

    updateAlbumData(daData, theId) {
        let myData = JSON.stringify(daData);
        let thisId = theId;
        let updateUrl = `https://music-and-cocktails-api.herokuapp.com/albums/${thisId}`;
        fetch(updateUrl, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: myData
        })
            .then(response => response.json())
            .then(response => {
                let message = document.querySelector(".message");
                message.textContent = "Your update was successful!";
                setTimeout(() => {
                    message.textContent = "";
                }, 4000);
            })
            .catch(err => console.log(err));
    }

    deleteAlbumData(theId) {
        let thisId = theId;
        let deleteUrl = `https://music-and-cocktails-api.herokuapp.com/albums/${thisId}`;
        fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).catch(err => console.log(err));
    }

    _onClick(e) {
        e.preventDefault();
        if (e.target.id === "update") {
            let theId = e.target.parentNode.querySelector(".album-id").value;
            let daData = this.getFormData(e);
            this.updateAlbumData(daData, theId);
        } else if (e.target.id === "delete") {
            let theId = e.target.parentNode.querySelector(".album-id").value;
            this.deleteAlbumData(theId);
        }
    }

    render() {
        const albumInfo = this.props.albumsData;
        return (
            <div>
                {albumsData}.map(albumInfo => {
             return (
              <div key={albumInfo.genre} className="">
                    <h1>DB Album</h1>
                    <form
                        className="album-input"
                        onClick={this._onClick}
                        onSubmit={e => this.onSubmit(e)}
                    >
                        <label>Album ID:</label>
                        <input
                            className="album-id"
                            ref={input => (this.id = input)}
                            type="text" readOnly
                            value={albumInfo.id}
                        />
                        <label>Genre:</label>
                        <input
                            ref={input => (this.genre = input)}
                            type="text"
                            defaultValue={albumInfo.genre}
                        />
                        <label>Artist:</label>
                        <input
                            ref={input => (this.artist = input)}
                            type="text"
                            defaultValue={albumInfo.artist}
                        />
                        <label>Album Title:</label>
                        <input
                            ref={input => (this.album_title = input)}
                            type="text"
                            name="Album Title"
                            defaultValue={albumInfo.album_title}
                        />
                        <label>Album Info:</label>
                        <input
                            ref={input => (this.album_info = input)}
                            type="text"
                            name="Album Info"
                        />
                        <label>Spotify Album ID:</label>
                        <input
                            ref={input => (this.spotify_album_id = input)}
                            type="text"
                            name="Spotify Album ID"
                            defaultValue={albumInfo.spotify_album_id}
                        />
                        <input id="update" type="submit" value="Update Album" />
                        <input id="delete" type="submit" value="Delete Album" />
                        <p className="message" />
                    </form>
                </div>
                );
              });
      </div>
        );
    }
}

export default EditAlbums;
