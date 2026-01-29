import React, { Component } from "react";
import "./App.css";

class LoadingScreen extends Component {
  render() {
    return (
      <div className="loading-screen">
        <img
          src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"
          alt="loading"
        />
        <h2>Loading...</h2>
      </div>
    );
  }
}

export default LoadingScreen;
