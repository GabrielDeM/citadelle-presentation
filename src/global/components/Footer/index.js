import React from 'react'

import { NavLink } from 'react-router-dom';

import {
  FaFacebookSquare,
  FaTwitterSquare,
} from 'react-icons/fa';
import './Footer.scss';

// datas
import footerData from '../../data/footer.js';

class Footer extends React.Component {

  render() {
    const split = window.location.pathname.split("/");

    if (split[1] === "backoffice")
      return(
        null
      )
    else
      return(
        <div className="Footer">
          <div className="link-footer_div">
            <ul className="ul-footer">
              {
                footerData.map(data => (
                  <li key={data.name} className="li-footer">
                    <NavLink
                      to={data.route}
                      className="link-footer"
                      exact
                      activeClassName="selected"
                      onClick={() => window.scrollTo(0,0)}
                      >
                        {data.name}
                        <span className={data.slider}></span>
                      </NavLink>
                    </li>
                ))
              }
            </ul>
          </div>
          <div className="social-icons_div">
            <a href="https://www.facebook.com/">
              <FaFacebookSquare className="social-icons facebook-icon" />
            </a>
            <a href="https://twitter.com">
              <FaTwitterSquare className="social-icons twitter-icon" />
            </a>
          </div>
          <div className="copyright">
            <p className="copyright-p">Citadelle &#169; 2018</p>
          </div>
        </div>
      )
  }

};

export default Footer;
