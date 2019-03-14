import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './CitadelList.scss';

const List = ({ _id, name, score, resources }) => (
  <div className="List">
    <Link
      to={`/backoffice/citadels/${_id}`}
      className="link-citadellist"
      onClick={() => window.scrollTo(0,0)}
    >
      <h3>{name}</h3>
      <p>Score: {score}</p>
      <div className="img-ressources">
        <img src={require("../../../../../game/utils/img/fer.png")} alt="fer" width="32px" height="24px" />{resources.iron}
        <img src={require('../../../../../game/utils/img/fuel.png')} alt="petrol" width="32px" height="32px" />{resources.oil}
        <img src={require('../../../../../game/utils/img/ammo.png')} alt="ammo" width="32px" height="24px" />{resources.ammo}
      </div>
    </Link>
  </div>
)

List.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default List;
