import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <div className="nav-bar">
                <div className="nav-logo">
                    <p>Music</p>
                    <p>+</p>
                    <p>Cocktails</p>
                </div>
                <nav>
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                    </ul>
                </nav>

            </div>
        );
    }
}

export default Header;