import React, { useState, Fragment } from 'react';
import { Parallax } from 'react-parallax';
import ToggleDisplay from 'react-toggle-display';
import { useAlbums } from '../../hooks/useAlbums';
import { useDrinks } from '../../hooks/useDrinks';
import AdminAlbums from './AdminAlbums';
import AdminDrinks from './AdminDrinks';
import Footer from '../layout/Footer';
import LoadingScreen from '../common/LoadingScreen';
import '../../styles/Admin.scss';
import sourceGif from '../../assets/source.gif';

function AdminPage() {
  const [showDrinks, setShowDrinks] = useState(false);
  const { albums, loading: albumsLoading, error: albumsError, refresh: refreshAlbums } = useAlbums();
  const { drinks, loading: drinksLoading, error: drinksError, refresh: refreshDrinks } = useDrinks();

  if (albumsLoading || drinksLoading) return <LoadingScreen />;

  return (
    <div id="admin-page">
      {(albumsError || drinksError) && (
        <p className="error-message">{albumsError || drinksError}</p>
      )}

      <Fragment>
        <div className="admin-title">
          <Parallax bgImage={sourceGif} bgImageAlt="turntable" strength={-175}>
            <div style={{ height: '400px' }} />
          </Parallax>
          <h1>
            <ToggleDisplay show={!showDrinks}>Admin Panel: Albums</ToggleDisplay>
            <ToggleDisplay if={showDrinks} tag="section">Admin Panel: Drinks</ToggleDisplay>
          </h1>
        </div>

        <div>
          <button
            className="buttons toggle-buttons"
            onClick={() => setShowDrinks((s) => !s)}
          >
            <ToggleDisplay show={!showDrinks}>Edit Drinks</ToggleDisplay>
            <ToggleDisplay if={showDrinks} tag="section">Edit Albums</ToggleDisplay>
          </button>

          <div className="detail-cards-containers">
            <ToggleDisplay show={!showDrinks}>
              <AdminAlbums albumsData={albums} refreshAlbums={refreshAlbums} />
            </ToggleDisplay>
            <ToggleDisplay if={showDrinks} tag="section">
              <AdminDrinks drinksData={drinks} refreshDrinks={refreshDrinks} />
            </ToggleDisplay>
          </div>
        </div>
      </Fragment>

      <Footer />
    </div>
  );
}

export default AdminPage;
