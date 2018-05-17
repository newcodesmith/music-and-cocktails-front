import React, { Component } from 'react';
import './App.css';

import queryString from "query-string"
import UserDrinkInfoCard from './UserDrinkInfoCard.jsx';
import UserAlbumCard from './UserAlbumCard';

class AlbumAndDrinkPage extends Component {
    state = {
        albumId: this.props.location.state,
        accessToken: queryString.parse(window.location.search).access_token,
        albumData: {},
        userData: [],
    };

    getAlbum() {
        const albumId = this.state.albumId;
        const albumUrl = `http://localhost:3000/albums/${albumId}`;
        let albumDataGrab = response => {
            this.setState({ albumData: response });
        };
        return fetch(albumUrl)
            .then(response => response.json())
            .then(albumDataGrab)
    };

    getUserData() {
        let accessToken = this.state.accessToken

        fetch("https://api.spotify.com/v1/me", {
            headers: { "Authorization": "Bearer " + accessToken }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({
                    userData: data
                })
            });
    }

    componentDidMount() {
        this.getAlbum();
        this.getUserData();
    }

    render() {
        // console.log("parent state", this.state);
        
        return (
            <div>
                <UserAlbumCard
                    {...this.state}
                />
                <UserDrinkInfoCard
                    drinkInfo={this.state.albumData}
                />
            </div>
        )
    }

}

export default AlbumAndDrinkPage;