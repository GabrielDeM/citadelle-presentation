import React from 'react'
import { connect } from 'react-redux'

import './BottomView.scss';
import { mapDynamicState } from '../../../../../../../global/utils';

const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: {
    citadel: 'citadel headquarter buildings buildingsData',
    currentView: 'viewType buildingView currentBuildingData',
  },
});
const mapDispatchToProps = dispatch => ({

});

class BottomView extends React.Component {

  getLevelStats = level => {
    if(level <= 3) {
      const { currentBuildingData } = this.props;
      const { name } = currentBuildingData.current;
      const currentStats = currentBuildingData[level];
      const { decreaseTime, time, production, storage, maxPopulation, recruitTime, ressources } = currentStats;
      const { iron, oil } = ressources;

      let formatedTime;
      if(time >= 3600) formatedTime = (time / 60).toFixed(2) + ' heures';
      else if(time >= 60) formatedTime = (time / 60).toFixed(2) + ' minutes';
      else formatedTime = time + ' secondes';

      let formatedRecruitTime;
      if(recruitTime >= 60) formatedRecruitTime = (recruitTime / 60).toFixed(2) + ' minutes';
      else formatedRecruitTime = recruitTime + ' secondes';

      return (
        <span>
          Temps pour améliorer: { formatedTime } <br/>
          Coût d'amélioration: { iron } fer, { oil } pétrole <br/>

          { name === 'headquarter' &&
          `Niveau max des bâtiments: ${level} \n`}
          <br/>
            { name === 'headquarter' && `Temps de construction: ${decreaseTime * 100}%\n` }
          <br/>
          { (name === 'oilPlateform' || name ===  'ironMine' || name ===  'ammoFactory') &&
          `Production: ${production} par seconde\n`}

          { name === 'warehouse' &&
          `Stockage: ${storage}\n`}

          { name === 'hydroponicFarm' &&
          `Population max: ${maxPopulation}\n`}

          { name === 'barrack' &&
          `Temps de recrutement: ${formatedRecruitTime}\n`}
        </span>
      );
    }
  }

  render() {
    const { currentBuildingData } = this.props;
    const { level } = currentBuildingData.current;
    const nextLevel = level + 1;

    return (
      <div className="BottomView container">
        <div className="bottomview container">
          <div className="bottom container">
            <div className="left main actual-level">
              <span className="level">Niveau actuel: { level }</span>
              <p className="stats">
                {this.getLevelStats(level)}
              </p>
            </div>

            <div className="right main next-level">
              <span className="level">Niveau suivant: { nextLevel }</span>
              <p className="stats">
                {this.getLevelStats(nextLevel)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomView)
