import React from 'react'
import { connect } from 'react-redux'

import './MapView.scss';
import { mapDynamicState } from '../../../../../../global/utils';
import { currentView } from '../../../../../../global/store/game/actions';

const {
  setViewType,
  setBuildingView,
} = currentView;

const mapStateToProps = mapDynamicState({
  game: 'citadel: citadel headquarter buildings buildingsData',
});

const mapDispatchToProps = dispatch => ({
  setViewType: viewType => dispatch(setViewType(viewType)),
  setBuildingView: buildingView => dispatch(setBuildingView(buildingView)),
});

class Quadrillage extends React.Component {

  handleClick = (buildingName = '', typeView = '') => () => {
    const { setViewType, setBuildingView } = this.props;
    setViewType(typeView);
    setBuildingView(buildingName);
  }

  // Pour l'instant, il n'y a que la citadelle du joueur sur la carte
  quadrillage = () => {
    const { citadel } = this.props;
    const div = [];

    for (let i = 0; i < 29; i += 1) {
      if (i === 14) {
        div.push(
          // Au clic sur la div de la citadelle, on retourne à la vue par défaut
          <div onClick={this.handleClick()} className="quadrillage user-citadel" key="userCitadel">
            <h3>{citadel.name}</h3>
          </div>
        );
      }
      div.push(
        <div className="quadrillage" key={'numero' + i}></div>
      );
    }

    return div;
  }

  render() {
    return(
      <div className="Quadrillage">
        {this.quadrillage()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quadrillage)
