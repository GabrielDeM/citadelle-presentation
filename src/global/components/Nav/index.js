import React from 'react'
import { connect } from 'react-redux';

import { NavLink, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { mapDynamicState } from '../../utils';

// datas
import { siteNotLogged, siteLogged, backoffice } from '../../data/nav.js';

import './Nav.scss';

const mapStateToProps = mapDynamicState('global: auth: logged');

class Nav extends React.Component {

  state = {
    scroll: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (window.scrollY < 70) {
        this.setState({
          ...this.state,
          scroll: false,
        });
      } else {
        this.setState({
          ...this.state,
          scroll: true,
        });
      }
    })
  }

  render() {
    const { logged } = this.props;
    const split = window.location.pathname.split('/');
    let route = [];
    if(split[1] === 'backoffice') route = backoffice;
    else if(logged) route = siteLogged;
    else route = siteNotLogged;

    return(
      <div className={classNames('Nav', {
        'Nav-scroll': this.state.scroll,
      })}>
        <ul className="ul-nav">
          {
            route.map(data => (
              <li key={data.name} className={`li-nav li-nav-${data.name}`}>
                <NavLink
                  to={data.route}
                  exact
                  className="link-nav"
                  activeClassName="selected"
                  onClick={() => window.scrollTo(0,0)}
                >
                  {data.name}
                  <span className="slider"></span>
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Nav));
