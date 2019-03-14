import React from 'react'
import { connect } from 'react-redux'

import './Game.scss';
import GameHeader from './GameHeader';
import GameInterface from '../GameInterface';
import { mapDynamicState } from '../../../../global/utils';
import { on, emit } from '../../../socket/citadel';
import { citadel } from '../../../../global/store/game/actions';

const {
  setCitadel,
  setHeadquarter,
  setBuildings,
  setBuildingsData,
} = citadel;

const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: 'citadel: buildings',
});

const mapDispatchToProps = dispatch => ({
  setCitadel: citadel => dispatch(setCitadel(citadel)),
  setHeadquarter: headquarter => dispatch(setHeadquarter(headquarter)),
  setBuildings: buildings => dispatch(setBuildings(buildings)),
  setBuildingsData: buildingsData => dispatch(setBuildingsData(buildingsData)),
});

class Game extends React.Component {

  componentDidMount = () => {
    const { user, setCitadel, setHeadquarter, setBuildings, setBuildingsData } = this.props;

    emit.retrieveBuildingsData();
    on.getBuildingsDataFromDB(buildingsData => setBuildingsData(buildingsData));

    user._id && emit.retrieveCitadel(user._id);
    on.getCitadelFromDB(citadel => {
      setCitadel(citadel);

      emit.retrieveHeadquarter(citadel._id);
      on.getHeadquarterFromDB(headquarter => {
      setHeadquarter(headquarter);

        emit.retrieveBuildings(headquarter._id);
        on.getBuildingsFromDB(buildings => setBuildings(buildings));
      });
    });
  }

  render() {
    const { user, buildings } = this.props;

    return (
      <div className="Game">
        <div className="game">
          { user.hasCitadel && buildings.length > 0 && <GameHeader /> }
        </div>
        <GameInterface />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
