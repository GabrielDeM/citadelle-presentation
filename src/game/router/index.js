import React from 'react';
import { Switch } from 'react-router-dom';
import Game from '../components/specifics/Game';
import ProtectedRoute from '../../global/components/ProtectedRoute';

const gameRouter = () => (
  <Switch>
    <ProtectedRoute exact path="/citadelle" component={Game} />
  </Switch>
);

export default gameRouter;
