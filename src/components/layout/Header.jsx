import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.scss';
import logo from '../../assets/music-cocktails-logo.png';

function Header() {
  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Music and Cocktails Logo" />
        <h1>Music+Cocktails</h1>
      </Link>
    </nav>
  );
}

export default Header;
