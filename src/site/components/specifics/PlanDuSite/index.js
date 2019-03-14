import React from 'react'

import { Link } from 'react-router-dom';

import planData from '../../../data/planDuSite';

import './PlanDuSite.scss';

const PlanDuSite = () => (
  <div className="PlanDuSite">
    <div className="new-index">
      <h2 className="plan-h2">Accueil</h2>
      <div className="link-div">
        <ul>
          {
            planData.accueil.map(data => (
              <li key={data.name}>
                <Link
                  to={data.route}
                  className="link-plan"
                >
                  {data.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
      <h2 className="plan-h2">Jeu</h2>
      <div className="link-div">
        <ul>
          {
            planData.jeu.map(data => (
              <li key={data.name}>
                <Link
                  to={data.route}
                  className="link-plan"
                >
                  {data.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  </div>
);

export default PlanDuSite;
