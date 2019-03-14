import React from 'react'

import { Link } from 'react-router-dom';

import './Header.scss';

class Header extends React.Component {

  render() {
    return(
      <div className="Header">
        <Link
          to="/"
          className="link-header"
          onClick={() => window.scrollTo(0,0)}
          >
            <h1 className="header-h1">Citadelle</h1>
          </Link>
        </div>
    )
  }
};

export default Header;
