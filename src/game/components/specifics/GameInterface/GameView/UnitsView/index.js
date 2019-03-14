import React from 'react'
import { connect } from 'react-redux'

import './UnitsView.scss';
import { mapDynamicState } from '../../../../../../global/utils';

const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: 'citadel: citadel headquarter buildings buildingsData',
});

const mapDispatchToProps = dispatch => ({

});

class UnitsView extends React.Component {
  render() {
    const { citadel } = this.props;
    const { unitsNumber } = citadel;

    return (
      <div className="UnitsView">
        <div className="unitsview">
          <strong className="units">{ unitsNumber } unités:</strong>
          <p>{ unitsNumber } - Soldats</p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitsView)
