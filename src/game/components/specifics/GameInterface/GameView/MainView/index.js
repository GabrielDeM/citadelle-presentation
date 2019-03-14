import React from 'react'
import { connect } from 'react-redux'

import './MainView.scss';
import { mapDynamicState } from '../../../../../../global/utils';
import TopView from './TopView';
import CenterView from './CenterView';
import BottomView from './BottomView';
import MapView from '../MapView/MapView';
import { currentView } from '../../../../../../global/store/game/actions';

const {
  setViewType,
  setBuildingView,
} = currentView;

const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: {
    citadel: 'citadel headquarter buildings buildingsData',
    currentView: 'viewType buildingView currentBuildingData',
  },
});

const mapDispatchToProps = dispatch => ({
  setViewType: viewType => dispatch(setViewType(viewType)),
  setBuildingView: buildingView => dispatch(setBuildingView(buildingView)),
});


class MainView extends React.Component {

  componentDidMount = () => {
    const { viewType } = this.props;
    if (!viewType) this.setDefaultView();
  }

  setDefaultView = () => {
    const { setViewType, setBuildingView } = this.props;
    setViewType('building');
    setBuildingView('headquarter');
  }
  render() {
    const {  viewType } = this.props;

    return (
      <div className="MainView">
        <div className="mainview">
          {
            viewType === 'map'
              && (
                <MapView />
              )
          }
          {
            viewType !== 'map' && viewType !== ''
              && (
                  <div className="mainContainer container">
                    <TopView />
                    <CenterView />
                    <BottomView />
                  </div>
              )
          }

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
