import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Header from './Header.jsx';
import registerServiceWorker from './registerServiceWorker';
import SplashPage from './SplashPage.jsx'
import Home from './Home.jsx';
import AdminPage from './admin/AdminPage';
import AlbumAndDrinkPage from './AlbumAndDrinkPage';

ReactDOM.render(
    <Router>
        <div>
            <Header />
            <Route exact path="/" component={SplashPage} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/Rock/Pop" component={AlbumAndDrinkPage} />
            <Route exact path="/Indie" component={AlbumAndDrinkPage} />
            <Route exact path="/R&B" component={AlbumAndDrinkPage} />
            <Route exact path="/Jazz" component={AlbumAndDrinkPage} />
            <Route exact path="/Folk/Country" component={AlbumAndDrinkPage} />
            <Route exact path="/Rap" component={AlbumAndDrinkPage} />

            <Route path="/admin" component={AdminPage} />
        </div>
    </Router>,

    document.getElementById('root'));
registerServiceWorker();
