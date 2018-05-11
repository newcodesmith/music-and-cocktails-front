import React, { Component } from "react";

class AddAlbum extends Component {

    state={message: ""};

    constructor() {
        super();
        this._onClick = this._onClick.bind(this);
    }

    getFormData(e) {
        return {
            genre: this.genre.value,
            artist: this.artist.value,
            album_title: this.album_title.value,
            album_info: this.album_info.value,
            spotify_album_id: this.spotify_album_id.value,
            album_drink_id: this.album_drink_id.value,
            // album_drink_id: 1,

        };
    }

    postFormData() {
        const postUrl = "http://localhost:3000/albums";
        let myData = JSON.stringify(this.getFormData());
        console.log(myData);
        
        fetch(postUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: myData
        })
            .then(response => response.json())
            .then(response => {
                this.setState({message: "Your album was submitted"})
                setTimeout(() => {
                    this.setState({message: ""})
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
        const drinkInfo = this.props.drinksData;

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
                            id="album_title"
                            type="text"
                            ref={input => (this.album_title = input)}
                        />

                        <label>Album Info:</label>
                        <textarea rows="7"
                            id="album_info"
                            type="text"
                            ref={input => (this.album_info = input)}
                        />

                        <label>Spotify Album ID:</label>
                        <input
                            id="spotify_album_id"
                            type="text"
                            ref={input => (this.spotify_album_id = input)}
                        />

                        <label>Paired Drink</label>

                        <select id="album_drink_id"
                            ref={input => (this.album_drink_id = input)}
                        >                            
                            <option></option>
                            {
                                drinkInfo.map((drink) => {
                                    return <option key={"drink" + drink.drink_id}
                                        value={drink.drink_id}>{drink.drink_title}</option>;
                                })
                            }
                        </select>

                        <input id="add-album" type="submit" value="Add Album" />
                        <input type="reset" value="Clear Form" />
                        <p className="message">{this.state.message}</p>
                    </form>
                </div>
            </div>
        )
    }
}


export default AddAlbum;