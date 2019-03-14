import React from 'react'
import { connect } from 'react-redux'

import './TopView.scss';
import { mapDynamicState } from '../../../../../../../global/utils';
import { resumeBuildings } from '../../../../../../utils/buildings';

const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: {
    citadel: 'citadel headquarter buildings buildingsData',
    currentView: 'viewType buildingView currentBuildingData',
  },
});


const mapDispatchToProps = dispatch => ({

});

class TopView extends React.Component {
  render() {
    const { currentBuildingData} = this.props;
    const { name, content } = currentBuildingData.current;
    return (
      <div className="TopView container">
        <div className="topview container">
          <div className="top container">
            <h4 className="buildingName">{ content }</h4>
            <p className="resume">{resumeBuildings(name)}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopView);
