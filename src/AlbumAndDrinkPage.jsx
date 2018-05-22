import React, { Component } from 'react';
import './App.css';

import queryString from "query-string"
import UserAlbumCard from './UserAlbumCard';

class AlbumAndDrinkPage extends Component {
    state = {
        ...this.props
    };

    render() {
        return (
            <div>
                <UserAlbumCard
                    {...this.state}
                />
            </div>
        )
    }

}

export default AlbumAndDrinkPage;