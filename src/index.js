import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/index.scss';
import Header from './components/layout/Header';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import AdminPage from './components/admin/AdminPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={SplashPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/admin" component={AdminPage} />
      </div>
    </Router>
  </ErrorBoundary>,
  document.getElementById('root')
);

registerServiceWorker();
