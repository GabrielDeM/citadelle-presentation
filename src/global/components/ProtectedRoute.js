import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapDynamicState } from '../utils/';

const mapStateToProps = mapDynamicState('global: auth: logged'); // on récupère le username de la personne connecté
const ProtectedRoute = ({ component: Component, logged, ...rest }) => (
  <Route {...rest} render={props => (
    logged || window.localStorage.getItem('username') // si loggedUsername existe ou est enreigstré dans le localStorage, alors le user est connecter et peu donc accéder au component demander, renvoie sur la page de login dans le cas contraire
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default withRouter(connect(mapStateToProps)(ProtectedRoute));

//! ProtectedRoute marche EXACTEMENT comme Route de react-router-dom
