import React, { Component } from "react";
import { Parallax, Background } from 'react-parallax';
import ToggleDisplay from 'react-toggle-display';
import AdminAlbums from "./AdminAlbums.jsx";
import AdminDrinks from "./AdminDrinks";


class AdminPage extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {

    return (
      <div>

        <div className="admin-title">
          <Parallax
            bgImage={require('./admin-title-image.jpg')}
            bgImageAlt="turntable"
            strength={-100}
          >
            <div style={{ height: '300px' }} />
          </Parallax>
          <h1>
            <ToggleDisplay show={!this.state.show}>
              Admin Panel: Albums
          </ToggleDisplay>
            <ToggleDisplay if={this.state.show} tag="section">
              Admin Panel: Drinks
          </ToggleDisplay>
          </h1>

        </div>

        <div>
          <div className="admin-buttons" onClick={() => this.handleClick()}>
            <ToggleDisplay show={!this.state.show}>
              Edit Drinks
          </ToggleDisplay>
            <ToggleDisplay if={this.state.show} tag="section">
              Edit Albums
          </ToggleDisplay>
          </div>

          <ToggleDisplay show={!this.state.show}>
            <AdminAlbums
            />
          </ToggleDisplay>

          <ToggleDisplay if={this.state.show} tag="section">
            <AdminDrinks
            />
          </ToggleDisplay>

        </div>

      </div>
    );
  }
}

export default AdminPage;
