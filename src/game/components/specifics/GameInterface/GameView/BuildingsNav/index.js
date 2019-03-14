import React from 'react'
import { connect } from 'react-redux'

import './BuildingsNav.scss';
import { mapDynamicState } from '../../../../../../global/utils';
import { currentView } from '../../../../../../global/store/game/actions';

const {
  setViewType,
  setBuildingView,
} = currentView;

const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: 'citadel: citadel headquarter buildings buildingsData',
});

const mapDispatchToProps = dispatch => ({
  setViewType: viewType => dispatch(setViewType(viewType)),
  setBuildingView: buildingView => dispatch(setBuildingView(buildingView)),
});

class BuildingsNav extends React.Component {

  handleClick = buildingName => e => {
    const { setViewType, setBuildingView } = this.props;
    setViewType('building');
    setBuildingView(buildingName);
    this.removeClass();
    e.target.className = 'ntm';
  }

  removeClass = () => {
    const ntm = document.getElementsByClassName('ntm');
    for(let i = 0; i < ntm.length; ++i) {
      ntm[i].className = '';
    }
  }

  render() {
    const { handleClick } = this;
    const { buildings } = this.props;
    let sortedBuildings = [];
    for (let i = 0; sortedBuildings.length < buildings.length; i++) {
      i = i >= buildings.length ? 0 : i;
      const length = sortedBuildings.length;
      const building = buildings[i];
      const { name } = building;
      if(length === 0 && name === 'barrack') sortedBuildings.push(building);
      if(length === 1 && name === 'ironMine') sortedBuildings.push(building);
      if(length === 2 && name === 'oilPlateform') sortedBuildings.push(building);
      if(length === 3 && name === 'ammoFactory') sortedBuildings.push(building);
      if(length === 4 && name === 'hydroponicFarm') sortedBuildings.push(building);
      if(length === 5 && name === 'warehouse') sortedBuildings.push(building);
    }

    return (
      <div className="BuildingsNav">
        <div className="buildingsnav">
          <p onClick={handleClick(('headquarter'))}>Quartier Général</p>
          {sortedBuildings.map(building => (
            <p key={building.name} onClick={handleClick(building.name)}>{ building.content }</p>
          ))}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingsNav)
