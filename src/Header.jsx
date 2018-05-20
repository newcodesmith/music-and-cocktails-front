import React, { Component } from "react";
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="nav-bar">
                <div className="nav-logo">
                <img src={require('./music-cocktails-logo.png')} alt="spotify" height="70px"/>
                </div>
                <h1>Music + Cocktails</h1>
                <nav id="nav-buttons">
                    <ul>
                        <li onClick={() => window.location = "/home"}>Home</li>
                        <li onClick={() => window.location = "/"}>Log Out</li>
                    </ul>

                </nav>

            </div>
        );
    }
}

export default Header;