import React, { useState, useEffect } from 'react';
import '../styles/App.scss';
import HomePageGenres from '../components/album/HomePageGenres';
import Footer from '../components/layout/Footer';
import LoadingScreen from '../components/common/LoadingScreen';
import AlbumModal from '../components/album/AlbumModal';
import { getAlbums } from '../services/albumService';
import backgroundImage from '../assets/record-collection-1.jpg';

function HomePage() {
  const [albumsData, setAlbumsData] = useState([]);
  const [albumId, setAlbumId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAlbums()
      .then(setAlbumsData)
      .catch(() => setError('Could not load albums. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const openModal = (id) => {
    setAlbumId(id);
    setIsModalOpen(true);
  };

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="home-page">
        <p className="error-message">{error}</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-page">
      <img
        className="home-page-pic"
        src={backgroundImage}
        alt="Record collection"
      />
      <HomePageGenres albumsData={albumsData} openModal={openModal} />
      <AlbumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        albumsData={albumsData}
        albumId={albumId}
      />
      <Footer />
    </div>
  );
}

export default HomePage;
