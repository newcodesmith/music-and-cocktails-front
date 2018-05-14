import React, {Component} from 'react';

class EditAlbum extends Component {
    constructor() {
        super()
        this.state = {
            album_id: null,
            genre: null,
            artist: null,
            album_title: null,
            album_info: null,
            spotify_album_id: null,
            album_drink_id: null,
            ...this.props
        };
        
    }

    componentDidMount() {
        const newState = {
            ...this.state,
            ...this.props
        }
        this.setState(newState)
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log("changeState", this.state);
        
    }
    handleSave = () => {
        this.props.saveAlbum(this.state)
    }

    render() {
        console.log('rendering.props', this.props);
        
    return (
        <div className="album-detail-card" >
            <h1>{this.props.genre} Album</h1>
            <div className="album-detail-card-form">
                <form
                    className="album-input"
                    onSubmit={this.handleSave}
                >

                    <label>Album ID:</label>
                    <input
                        className="album-id"
                        type="text"
                        name='album_id'
                        value={this.props.album_id}
                    />

                    <label>Genre:</label>
                    <input
                        type="text"
                        name='genre'
                        value={this.props.genre}
                    />

                    <label>Artist:</label>
                    <input
                        type="text"
                        name='artist'
                        onChange={this.handleChange}
                        defaultValue={this.props.artist}
                    />

                    <label>Album Title:</label>
                    <input
                        type="text"
                        name='album_title'
                        onChange={this.handleChange}
                        defaultValue={this.props.album_title}

                    />

                    <label>Album Info:</label>
                    <textarea
                        type="text"
                        name='album_info'
                        onChange={this.handleChange}
                        defaultValue={this.props.album_info}

                    />

                    <label>Spotify Album ID:</label>
                    <input
                        type="text"
                        name='spotify_album_id'
                        onChange={this.handleChange}
                        defaultValue={this.props.spotify_album_id}

                    />

                    <label>Change Paired Drink</label>
                    {/* <DrinkOptions
                        selected={this.props.drink_title}
                        name='album_drink_id'
                        onChange={this.handleChange}
                    /> */}

                    <div className="admin-drink-info-card">
                        <h1>Current Paired Drink Info</h1>
                        <h3>{this.props.drink_title}</h3>
                        <div className="admin-drink-info">
                            <div className="">
                                <img src={this.props.drink_pic_url} alt={this.props.drink_title} height="150" />
                            </div>
                            <div className="">
                                <ul>
                                    <li>{this.props.drink_description}</li>
                                    <div>
                                        {this.props.ingredients.split('\n').map((item, key) => {
                                            return <span key={key}>{item}<br /></span>
                                        })}
                                    </div>
                                    <li>{this.props.direction}</li>
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
    }
}

export default EditAlbum;
