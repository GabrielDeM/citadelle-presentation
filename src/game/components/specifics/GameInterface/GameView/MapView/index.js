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

class MapView extends React.Component {

  removeClass = () => {
    const ntm = document.getElementsByClassName('ntm');
    for(let i = 0; i < ntm.length; ++i) {
      ntm[i].className = '';
    }
  }

  handleClick = buildingName => e => {
    const { setViewType, setBuildingView } = this.props;
    setViewType('map');
    setBuildingView(buildingName);
    this.removeClass();
    e.target.className = 'ntm';
  }

  render() {
    const { handleClick } = this;

    return (
      <div className="MapView">
        <div className="mapview">
          <p onClick={handleClick(('map'))}>Map</p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
