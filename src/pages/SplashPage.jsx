import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/SplashPage.scss';
import Footer from '../components/layout/Footer';
import backgroundImage from '../assets/drink-headphones.png';

function SplashPage() {
  const history = useHistory();

  return (
    <div>
      <div
        className="splash-page"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="splash-title">
          <h1>Welcome to Music and Cocktails</h1>
          <p>
            Music and Cocktails is your place to discover curated music with a
            paired drink. Every month we provide a different album and paired
            drink from a few different genres for you to enjoy.
          </p>
          <p>For the best experience, please view on a desktop or tablet device.</p>
          <button
            className="splash-button"
            onClick={() => history.push('/home')}
          >
            <b>Enter</b>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SplashPage;
