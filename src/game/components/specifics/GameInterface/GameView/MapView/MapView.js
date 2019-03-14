import React from 'react'

import './MapView.scss';
import Quadrillage from './Quadrillage';

const MapView = () => (
  <div className="MapView">
    <div className="mapview">
      <h2>Map</h2>
      <Quadrillage />
    </div>
  </div>
)

export default MapView;
