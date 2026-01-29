import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Header from './Header.jsx';
import registerServiceWorker from './registerServiceWorker.js';
import SplashPage from './SplashPage.jsx'
import Home from './Home.jsx';
import AdminPage from './admin/AdminPage.jsx';

ReactDOM.render(
    <Router>
        <div>
            <Header />
            <Route exact path="/" component={SplashPage} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/admin" component={AdminPage} />
            <footer />
        </div>
    </Router>,

    document.getElementById('root'));
registerServiceWorker();
