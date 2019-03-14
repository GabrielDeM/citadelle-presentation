import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Backoffice from '../components/specifics/Backoffice';
import CitadelList from '../components/specifics/MainView/CitadelList';
import UserList from '../components/specifics/MainView/UserList';
import UserPage from '../components/specifics/MainView/UserPage';
import CitadelPage from '../components/specifics/MainView/CitadelPage';

const BackofficeRouter = () => (
  <Switch>
    <Route exact path="/backoffice" component={Backoffice} />
    <Route exact path="/backoffice/players" component={UserList} />
    <Route exact path="/backoffice/players/:userId" component={UserPage} />
    <Route exact path="/backoffice/citadels" component={CitadelList} />
    <Route exact path="/backoffice/citadels/:id" component={CitadelPage} />
  </Switch>
);

export default BackofficeRouter;
