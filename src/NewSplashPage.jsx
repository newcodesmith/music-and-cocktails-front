import React, { Component } from "react";
import './SplashPage.css';


class SplashPage extends Component {
    render() {
        return (

            <div>
            <img className="splash-page" src={require("./drink-headphones.png")}/>
                <div className="splash-title">
                    <h1>Welcome to Music and Cocktails</h1>
                    <p>Music and Cocktails is your place to discover curated old and new music a paired drink. etc. etc.</p>
                    <p>In order to use this service you will need a to sign into to a valid Spotify account</p>
                    <div
                        onClick={() => window.location = "https://spotify-back-end.herokuapp.com/login"}
                       className="splash-button"
                    >
                        <b>Sign In With Spotify</b>
                    </div>
                </div>
            </div>
        );
    }
}

export default SplashPage;