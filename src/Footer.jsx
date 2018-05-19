import React, { Component } from "react";
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div id="footer">
                <h1>&copy; NEWCODESMITH 2018 </h1>
                <nav id="footer-buttons">
                    <ul>
                        <li onClick={() => window.location = "/admin"}>Admin</li>
                    </ul>

                </nav>

            </div>
        );
    }
}

export default Footer;