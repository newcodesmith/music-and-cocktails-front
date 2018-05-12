import React, { Component } from "react";
import DrinkOptions from "./DrinkOptions.jsx"

class EditAlbums extends Component {

    state = { message: "" };

    constructor() {
        super();
        this.state = {
            albumsData: []
        };

        this._onClick = this._onClick.bind(this);
    }

    getAlbums() {
        const albumsUrl = "http://localhost:3000/albums";
        let albumsDataGrab = response => {
            this.setState({ albumsData: response });
        };
        return fetch(albumsUrl)
            .then(response => response.json())
            .then(albumsDataGrab)
    }

    getFormData(e) {
        return {
            genre: e.target.parentNode.querySelectorAll("input")[1].value,
            artist: e.target.parentNode.querySelectorAll("input")[2].value,
            album_title: e.target.parentNode.querySelectorAll("input")[3].value,
            album_info: e.target.parentNode.querySelectorAll("textarea")[0].value,
            spotify_album_id: e.target.parentNode.querySelectorAll("input")[4].value,
            album_drink_id: e.target.parentNode.querySelectorAll("select")[0].value,
        };
    }

    updateAlbumData(daData, theId) {
        let myData = JSON.stringify(daData);
        let thisId = theId;

        let updateUrl = `http://localhost:3000/albums/${thisId}`;

        return fetch(updateUrl, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: myData
        })
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    deleteAlbumData(theId) {
        let thisId = theId;
        let deleteUrl = `http://localhost:3000/albums/${thisId}`;

        return fetch(deleteUrl, {
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
            this.updateAlbumData(daData, theId)
                .then(() => this.getAlbums())
                .then(response => {
                    this.setState({ message: "Your album was updated" })
                    setTimeout(() => {
                        this.setState({ message: "" })
                    }, 4000);
                })
        } else if (e.target.id === "delete") {
            let theId = e.target.parentNode.querySelector(".album-id").value;
            this.deleteAlbumData(theId)
                .then(() => this.getAlbums());
        }
    }

    componentDidMount() {
        this.getAlbums();
    }

    render() {
        const albumAndDrink = this.state.albumsData;

        return (

            albumAndDrink.sort((a, b) => a.album_id - b.album_id)
                .map(albumAndDrinkInfo => {

                    return (
                        <div key={"album" + albumAndDrinkInfo.album_id} className="album-detail-card" >
                            <h1>{albumAndDrinkInfo.genre} Album</h1>
                            <div className="album-detail-card-form">
                                <form
                                    className="album-input"
                                    onClick={this._onClick}
                                    onSubmit={e => this.onSubmit(e)}
                                >

                                    <label>Album ID:</label>
                                    <input
                                        className="album-id"
                                        type="text"
                                        ref={input => (this.id = input)}
                                        readOnly value={albumAndDrinkInfo.album_id}
                                    />

                                    <label>Genre:</label>
                                    <input
                                        type="text"
                                        ref={input => (this.genre = input)}
                                        readOnly defaultValue={albumAndDrinkInfo.genre}
                                    />

                                    <label>Artist:</label>
                                    <input
                                        type="text"
                                        ref={input => (this.artist = input)}
                                        defaultValue={albumAndDrinkInfo.artist}
                                    />

                                    <label>Album Title:</label>
                                    <input
                                        type="text"
                                        ref={input => (this.album_title = input)}
                                        defaultValue={albumAndDrinkInfo.album_title}
                                    />

                                    <label>Album Info:</label>
                                    <textarea
                                        type="text"
                                        ref={input => (this.album_info = input)}
                                        defaultValue={albumAndDrinkInfo.album_info}
                                    />

                                    <label>Spotify Album ID:</label>
                                    <input
                                        type="text"
                                        ref={input => (this.spotify_album_id = input)}
                                        defaultValue={albumAndDrinkInfo.spotify_album_id}
                                    />

                                    <label>Change Paired Drink</label>
                                    <DrinkOptions
                                        selected={albumAndDrinkInfo.drink_title}
                                    />

                                    <div className="admin-drink-info-card">
                                        <h1>Current Paired Drink Info</h1>
                                        <h3>{albumAndDrinkInfo.drink_title}</h3>
                                        <div className="admin-drink-info">
                                            <div className="">
                                                <img src={albumAndDrinkInfo.drink_pic_url} alt={albumAndDrinkInfo.drink_title} height="150" />
                                            </div>
                                            <div className="">
                                                <ul>
                                                    <li>{albumAndDrinkInfo.drink_description}</li>
                                                    <div>
                                                        {albumAndDrinkInfo.ingredients.split('\n').map((item, key) => {
                                                            return <span key={key}>{item}<br /></span>
                                                        })}
                                                    </div>
                                                    <li>{albumAndDrinkInfo.direction}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="submit-buttons">
                                        <input id="update" type="submit" value="Update Album" />
                                        {/* <input id="delete" type="submit" value="Delete Album" /> */}
                                        <p className="message">{this.state.message}</p>
                                    </div>

                                </form>
                            </div>

                        </div>
                    )
                })
        );
    }
}

export default EditAlbums;