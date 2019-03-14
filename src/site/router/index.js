import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/specifics/Home';
import Signup from '../components/specifics/Signup';
import Login from '../components/specifics/Login';
import Cgu from '../components/specifics/CGU';
import Faq from '../components/specifics/FAQ';
import Contact from '../components/specifics/Contact';
import PlanDuSite from '../components/specifics/PlanDuSite';
import ProfilePage from '../components/specifics/ProfilePage';
import ProtectedRoute from '../../global/components/ProtectedRoute';


const siteRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/cgu" component={Cgu} />
    <Route exact path="/faq" component={Faq} />
    <Route exact path="/contact" component={Contact} /> /}
    <Route exact path="/plan-du-site" component={PlanDuSite} />
    <ProtectedRoute exact path="/profile" component={ProfilePage} />
    <Route exact path="/news" component={Home} />
    <Route exact path="/forum" component={Home} />
  </Switch>
);
export default siteRouter;
