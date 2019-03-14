import React from 'react'
import { connect } from 'react-redux'

import './CenterView.scss';
import { mapDynamicState } from '../../../../../../../global/utils';
import { on, emit } from '../../../../../../socket/citadel';
import { currentView } from '../../../../../../../global/store/game/actions';

const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: {
    citadel: 'citadel headquarter buildings buildingsData',
    currentView: 'viewType buildingView currentBuildingData',
  },
});

const {
  setBuildingLevel,
} = currentView;

const mapDispatchToProps = dispatch => ({
  setBuildingLevel: (level, name) => dispatch(setBuildingLevel(level, name)),
});

class CenterView extends React.Component {

  canUpgrade = () => {
    const { headquarter, currentBuildingData } = this.props;
    let lvlBuilding = currentBuildingData.current.level;
    lvlBuilding = lvlBuilding > 3 ? 3 : lvlBuilding;
    const { name } = currentBuildingData.current;
    const lvlHQ = headquarter.level;
    const { citadel } = this.props;
    const { iron, oil } = citadel.resources;
    const upgradeData = currentBuildingData[lvlBuilding].ressources;
    return (
      (lvlHQ > lvlBuilding || name === 'headquarter')
      &&
      (iron >= upgradeData.iron && oil >= upgradeData.oil)
      &&
      (lvlBuilding + 1 <= 3)
      );
  }

  handleClick = () => {
    if(this.canUpgrade()) {
      const { currentBuildingData, setBuildingLevel } = this.props;
      const { name, _id, level } = currentBuildingData.current
      const levelBuildingData = {name, _id, level: level+1}
      emit.levelUpBuilding(levelBuildingData);
      on.getLevelBuildingFromDB(buildingData => {
        let { level, name } = buildingData;
        name = name || 'headquarter';
        setBuildingLevel(level+1, name);
      });
    }
  }


  recruit = () => {
    const { citadel } = this.props;
    const { ammo } = citadel.resources;
    const { population } = citadel;
    const { currentBuildingData } = this.props;
    const { name } = currentBuildingData.current;

    const hydroponicFarm = this.props.buildings.filter(building => building.name === 'hydroponicFarm')[0];
    const { level } = hydroponicFarm;
    const { maxPopulation } = this.props.buildingsData[0].upgrade.hydroponicFarm[level];

    return (
      (name === 'barrack')
      &&
      (ammo >= 50 && population < maxPopulation )
    )

  }

  render() {
    const { currentBuildingData } = this.props;
    let { level } = currentBuildingData.current;
    level = level > 3 ? 3 : level;
    const { iron, oil } = currentBuildingData[level].ressources;

    return (
      <div className="CenterView container">
        <div className="centerview container">
          <div className="center container">
            <div className="ressources">
              <span className="iron">Fer: { iron } </span> <br/>
              <span className="oil">Pétrole: { oil } </span>
            </div>
            <button className="upgrade-button" disabled={!this.canUpgrade()} onClick={this.handleClick} >Améliorer</button>
            {currentBuildingData.current.name ==='barrack' && <button className="recruit-button" disabled={!this.recruit()} >Recruter</button>}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterView)
