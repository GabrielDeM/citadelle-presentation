import React from 'react'
import { connect } from 'react-redux'

import './GameInterface.scss';
import { mapDynamicState } from '../../../../global/utils';
import GameMenu from './GameMenu';
import GameView from './GameView';

const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: 'citadel: citadel headquarter buildings buildingsData',
});

const mapDispatchToProps = dispatch => ({

});

class GameInterface extends React.Component {
  render() {
    const { user, citadel, headquarter, buildings: building, buildingsData: buildingData } = this.props;
    const { name } = citadel;
    const { level } = headquarter;
    const buildings = building.length > 0;
    const buildingsData = buildingData.length > 0;

    if(name && level && buildings && buildingsData && user.hasCitadel)
      return <GameView />;
    else if(!user.hasCitadel)
      return <GameMenu />;
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameInterface)
