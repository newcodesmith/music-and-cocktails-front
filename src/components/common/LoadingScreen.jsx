import React from 'react';
import '../../styles/App.scss';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img
        src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"
        alt="Loading animation"
      />
      <h2>Loading...</h2>
    </div>
  );
}

export default LoadingScreen;
