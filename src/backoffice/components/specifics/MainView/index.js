import React from 'react'
import { connect } from 'react-redux'

import './MainView.scss';
import { mapDynamicState } from '../../../../global/utils';

const mapStateToProps = mapDynamicState('stateName: reducerName: prop');

const mapDispatchToProps = dispatch => ({

});

class MainView extends React.Component {
  render() {
    return (
      <div className="MainView">
        <div className="mainview">
          <p>MainView work!</p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
