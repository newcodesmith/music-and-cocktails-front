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
            album_info: e.target.parentNode.querySelectorAll("textarea")[0].value,
            spotify_album_id: e.target.parentNode.querySelectorAll("input")[4].value,
            drink_id: e.target.parentNode.querySelectorAll("select")[0].value,
        };
    }

    updateAlbumData(daData, theId) {
        let myData = JSON.stringify(daData);
        let thisId = theId;
        let updateUrl = `https://music-and-cocktails-api.herokuapp.com/albums/${thisId}`;
        console.log(thisId);

        console.log(myData);

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
        const albumAndDrink = this.props.albumsData;

        return (
            albumAndDrink.map(albumAndDrinkInfo => {
                return (
                    <div key={albumAndDrinkInfo.id} className="album-detail-card" >
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
                                readOnly value={albumAndDrinkInfo.id}
                            />

                            <label>Genre:</label>
                            <input
                                type="text"
                                ref={input => (this.genre = input)}
                                defaultValue={albumAndDrinkInfo.genre}
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

                            <label>Paired Drink</label>
                            <select
                                ref={input => (this.drink_id = input)}
                                defaultValue={albumAndDrink.drink_id}
                            >
                                <option value={albumAndDrink.drink_id} >{albumAndDrink.drink_title}</option>
                                {
                                    albumAndDrink.map(function (drink) {
                                        return <option key={drink.drink_id}
                                            value={drink.drink_id}>{drink.drink_title}</option>;
                                    })
                                }
                            </select>

                            <input id="update" type="submit" value="Update Album" />
                            <input id="delete" type="submit" value="Delete Album" />
                            <p className="message" />
                        </form>
                        <div className="admin-drink-info">
                            <div>
                                <h1>Current Paired Drink</h1>
                                <h3>{albumAndDrinkInfo.drink_title}</h3>
                                <img src={albumAndDrinkInfo.drink_pic_url} alt={albumAndDrinkInfo.drink_title} height="150" />
                            </div>
                            <div>
                                <p>{albumAndDrinkInfo.drink_description}</p>
                                <p>{albumAndDrinkInfo.ingredients}</p>
                                <p>{albumAndDrinkInfo.direction}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        );
    }
}

export default EditAlbums;