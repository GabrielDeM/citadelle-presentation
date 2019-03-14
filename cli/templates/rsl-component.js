import React from 'react'
import { connect } from 'react-redux'

import './component.scss';
import { mapDynamicState } from 'path';


const mapStateToProps = mapDynamicState('stateName: reducerName: prop');

const mapDispatchToProps = dispatch => ({

});

const component = ({ state }) => (
  <div className="component">
    <div className="component-low">
      <p>component work!</p>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(component)
