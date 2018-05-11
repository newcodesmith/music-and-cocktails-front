import React, { Component } from "react";

class AddAlbum extends Component {
    constructor() {
        super();
        this._onClick = this._onClick.bind(this);
    }

    getFormData(e) {
        return {
            genre: this.genre.value,
            artist: this.artist.value,
            albumTitle: this.album_title.value,
            albumInfo: this.album_info.value,
            spotifyAlbumId: this.spotify_album_id.value,
            drinkId: this.drink_id.value,
        };
    }

    postFormData() {
        const postUrl = "https://music-and-cocktails-api.herokuapp.com/albums";
        let myData = this.getFormData();
        fetch(postUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myData)
        })
            .then(response => response.json())
            .then(response => {
                let message = document.querySelector("#message");
                message.textContent = "Your event was submitted!";
                setTimeout(() => {
                    message.textContent = "";
                }, 4000);
            })
            .catch(err => console.log(err));
        document.querySelector(".album-input").reset();
    }

    _onClick(e) {
        if (e.target.id === "add-album") {
            this.getFormData();
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.postFormData();
      }

    render() {
        const albumAndDrink = this.props.albumsData;

        return (
            <div className="album-detail-card" >
                <h1>Add Album</h1>
                <div className="album-detail-card-form">
                    <form
                        className="album-input"
                        onClick={this._onClick}
                        onSubmit={e => this.onSubmit(e)}
                    >

                        <label>Genre:</label>
                        <input
                            id="genre"
                            type="text"
                            ref={input => (this.genre = input)}
                        />

                        <label>Artist:</label>
                        <input
                            id="artist"
                            type="text"
                            ref={input => (this.artist = input)}
                        />

                        <label>Album Title:</label>
                        <input
                            id="albumTitle"
                            type="text"
                            ref={input => (this.album_title = input)}
                        />

                        <label>Album Info:</label>
                        <textarea rows="7"
                            id="albumInfo"
                            type="text"
                            ref={input => (this.album_info = input)}
                        />

                        <label>Spotify Album ID:</label>
                        <input
                            id="spotifyAlbumId"
                            type="text"
                            ref={input => (this.spotify_album_id = input)}
                        />

                        <label>Paired Drink</label>
                        <select
                            id="drinkId"
                            ref={input => (this.drink_id = input)}
                        >
                            <option></option>
                            {
                                albumAndDrink.map(function (drink) {
                                    return <option key={drink.drink_id}
                                        value={drink.drink_id}>{drink.drink_title}</option>;
                                })
                            }
                        </select>

                        <input id="add-album" type="submit" value="Add Album" />
                        <input type="reset" value="Clear Form" />
                        <p className="message" />
                    </form>
                </div>
            </div>
        )
    }
}


export default AddAlbum;