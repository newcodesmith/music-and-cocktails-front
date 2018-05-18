import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <div className="nav-bar">
                <div className="nav-logo">
                    <p>Music + Cocktails</p>
                </div>
                <nav>
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                        <div onClick={() => window.location = "/"} id="header-signout">
                            <li>Log Out</li>
                        </div>
                    </ul>

                </nav>

            </div>
        );
    }
}

export default Header;