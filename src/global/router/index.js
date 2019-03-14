import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SiteRouter from '../../site/router';
import GameRouter from '../../game/router';
import BackofficeRouter from '../../backoffice/router';
import { mapDynamicState } from '../utils';

const mapStateToProps = mapDynamicState('global: auth: user');

const GlobalRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Nav />
      <SiteRouter />
      <BackofficeRouter />
      <GameRouter />
      <Footer />
    </div>
  </BrowserRouter>
);

export default connect(mapStateToProps)(GlobalRouter);
