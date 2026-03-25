import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../../styles/Footer.scss';

function Footer() {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div id="footer" role="contentinfo">
      <h1>&copy; NEWCODESMITH 2018</h1>
      <nav id="footer-buttons" aria-label="Footer navigation">
        <ul>
          {pathname === '/admin' ? (
            <li>
              <button onClick={() => history.push('/home')}>Home</button>
            </li>
          ) : (
            <li>
              <button onClick={() => history.push('/admin')}>Admin</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Footer;
