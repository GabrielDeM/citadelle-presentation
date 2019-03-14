import React from 'react'
import { connect } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress';

import './EventsView.scss';
import { mapDynamicState } from '../../../../../../global/utils';
import { citadel } from '../../../../../../global/store/game/actions';
import { on, emit } from '../../../../../socket/citadel';


const { setEndUpgradeTime, setBuildings, setHeadquarter } = citadel;
const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: {
    citadel: 'citadel headquarter buildings buildingsData',
    currentView: 'viewType buildingView currentBuildingData',
  },
});

const mapDispatchToProps = dispatch => ({
  setEndUpgradeTime: (type, building) => dispatch(setEndUpgradeTime(type, building)),
  setBuildings: buildings => dispatch(setBuildings(buildings)),
  setHeadquarter: buildings => dispatch(setHeadquarter(buildings)),
});

class EventsView extends React.Component {

  formatedTime = timestamp => {
    const date = new Date (timestamp);
    const hours = date.getHours()-1;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let toFormateTime = '';
    if (hours > 0) toFormateTime += hours + ' h ';
    if (minutes > 0) toFormateTime += minutes + ' min ';
    if (seconds > 0) toFormateTime += seconds + ' s';
    return toFormateTime
  }

  removeBuildingUpgrade = building => {
    const { setBuildings, setEndUpgradeTime, buildings, headquarter, setHeadquarter } = this.props;
    let { level, name, _id } = building;
    level++;

    let type;
    let currentBuilding;
    if(building.name === 'headquarter') {
      const newHeadquarter = { ...headquarter, level };
      type= 'headquarter';
      currentBuilding = newHeadquarter;
    }
    else {
      const newBuilding = buildings.filter(currentBuilding => name !== currentBuilding.name);
      currentBuilding = buildings.map(currentBuilding => ({...currentBuilding, endUpgradeTime : null}));
      type= 'buildings';

      setEndUpgradeTime(type, currentBuilding);
      const levelBuildingData = {name, _id, level: level+1}
      emit.levelUpBuilding(levelBuildingData);
      on.getLevelBuildingFromDB(buildingData => {
        let { level, name } = buildingData;
        name = name || 'headquarter';

        if(name === 'headquarter') {
          const newHeadquarter = { ...buildingData, level: level + 1 };
          //setHeadquarter(newHeadquarter);
        } else {
          const otherBuildings = buildings.filter(building => building.name !== name);
          const newBuilding = buildings.filter(building => building.name === name)[0];
          /*setBuildings([
            ...otherBuildings,
            { ...newBuilding, level: level + 1 },
          ]);*/
        }
      });
    }
  }

  render() {
    //! utiliser le socket de CenterView du handleClick
    const { currentBuildingData, buildingsData, buildings } = this.props;

    if(currentBuildingData){
      const lvlBuilding = currentBuildingData.current.level;
      let { level, name } = currentBuildingData.current;
      level = level > 3 ? 3 : level;
      const buildingDataUpgradeTime= buildingsData[0].upgrade[name][level].time;
      const upgradingBuilding = buildings.filter(building => building.endUpgradeTime)
      return (
        <div className="EventsView">
          <div className="eventsview">
            <h2>Améliorations</h2>
            <div>
              {upgradingBuilding.map(building => {
                const buildingDataUpgradeTime = building.endUpgradeTime-Date.now();
                if(building.endUpgradeTime <= Date.now()){this.removeBuildingUpgrade(building)}
                const width = 100-((buildingDataUpgradeTime/1000)/building.time)*100;
                return (
                <React.Fragment key={`event-${building.name}`}>
                  <p className="time">{this.formatedTime(buildingDataUpgradeTime)} restant</p>
                  <div className="progress">
                    <LinearProgress variant="determinate" value={width} />
                    <p>{building.level} -> {building.level+1}</p>
                  </div>
                </React.Fragment>
              )})}
            </div>
            <hr/>
          </div>
        </div>
      )
    }
    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsView)
