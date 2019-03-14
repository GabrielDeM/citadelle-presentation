import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';

import './GameView.scss';
import BuildingsNav from './BuildingsNav';
import MainView from './MainView';
import UnitsView from './UnitsView';
import EventsView from './EventsView';
import MapView from './MapView';
import ChatView from './ChatView';
import { mapDynamicState } from '../../../../../global/utils';
import { citadel } from '../../../../../global/store/game/actions';

const { updateRessources, } = citadel;

const mapStateToProps = mapDynamicState('global: auth: user');

const mapDispatchToProps = dispatch => ({
  updateRessources: () => dispatch(updateRessources()),
});

class GameView extends React.Component {

  state = {
    updateRessourceInterval: null,
  }

  componentDidMount = () => {
    const { updateRessources } = this.props;
    const updateRessourceInterval = setInterval(updateRessources, 1000);
    this.setState({ updateRessourceInterval });
  }

  componentWillUnmount = () => {
    const { updateRessourceInterval } = this.state;
    clearInterval(updateRessourceInterval);
  }

  render() {
    return (
      <div className="GameView">
        <div className="new-index">
          <div className="gameview">
            <Grid
              container
              spacing={0}
              alignItems="stretch"
            >
              <Grid className="left" item xs={12} sm={12} md={3} lg={2}>
                <MapView />
                <BuildingsNav />
              </Grid>
              <Grid className="center" item xs={12} sm={12} md={6} lg={8}>
                <MainView />
              </Grid>
              <Grid className="right" item xs={12} sm={12} md={3} lg={2}>
                <UnitsView />
                <EventsView />
              </Grid>
            </Grid>
            <ChatView />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameView)
