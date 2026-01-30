import React, { Component } from "react";
import { Parallax } from "react-parallax";
import ToggleDisplay from "react-toggle-display";
import AdminAlbums from "./AdminAlbums.jsx";
import AdminDrinks from "./AdminDrinks";
import Footer from "../Footer.jsx";
import "./Admin.css";
import { Fragment } from "react/cjs/react-jsx-runtime.production.min.js";
import LoadingScreen from "../LoadingScreen.jsx";

class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      albumsData: [],
      drinksData: [],
    };
  }

  getAlbums = async () => {
    // const albumsUrl = "https://music-and-cocktails-api-e2b71b349cc8.herokuapp.com/albums";
    const albumsUrl = "http://localhost:3300/albums";
    try {
      const response = await fetch(albumsUrl);
      const data = await response.json();
      this.setState({ albumsData: data });
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  getDrinks = async () => {
    const drinksUrl = "http://localhost:3300/drinks";
    try {
      const response = await fetch(drinksUrl);
      const data = await response.json();
      this.setState({ drinksData: data });
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  componentDidMount() {
    this.getDrinks();
    this.getAlbums();
  }

  handleClick() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div id="admin-page">
        {this.state.albumsData.length > 0 &&
        this.state.drinksData.length > 0 ? (
          <Fragment>
            <div className="admin-title">
              <Parallax
                bgImage={require("./assets/source.gif")}
                bgImageAlt="turntable"
                strength={-175}
              >
                <div style={{ height: "400px" }} />
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
              <div
                className="buttons toggle-buttons"
                onClick={() => this.handleClick()}
              >
                <ToggleDisplay show={!this.state.show}>
                  Edit Drinks
                </ToggleDisplay>
                <ToggleDisplay if={this.state.show} tag="section">
                  Edit Albums
                </ToggleDisplay>
              </div>

              <div className="detail-cards-containers">
                <ToggleDisplay show={!this.state.show}>
                  <AdminAlbums
                    albumsData={this.state.albumsData}
                    getAlbums={this.getAlbums}
                  />
                </ToggleDisplay>

                <ToggleDisplay if={this.state.show} tag="section">
                  <AdminDrinks
                    drinksData={this.state.drinksData}
                    getDrinks={this.getDrinks}
                  />
                </ToggleDisplay>
              </div>
            </div>
          </Fragment>
        ) : (
          <LoadingScreen />
        )}
        <Footer />
      </div>
    );
  }
}

export default AdminPage;
