import React from 'react'
import { connect } from 'react-redux'

import './Backoffice.scss';
import { mapDynamicState } from '../../../../global/utils';

const mapStateToProps = mapDynamicState('global: auth: user');

const mapDispatchToProps = dispatch => ({

});

class Backoffice extends React.Component {

  render() {
    return (
      <div className="Backoffice">
        <div className="backoffice">
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Backoffice)
