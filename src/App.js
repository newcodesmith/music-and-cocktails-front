import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
    }
    this._onClick = this._onClick.bind(this);
  }

  _onClick(event) {
    event.preventDefault();
  }

  render() {
    return (
      <HashRouter>
        <div onClick={this._onClick}>
        </div>
      </HashRouter>
    );
  }
}

export default App;
