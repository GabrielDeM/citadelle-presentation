import React from 'react'
import { connect } from 'react-redux';

import {
  FaQuoteLeft,
  FaQuoteRight,
} from 'react-icons/fa';
import { _mapDynamicState } from '../../../../global/utils';

import './Home.scss';

const mapStateToProps = _mapDynamicState({global: ['auth']});

const Home = ({ auth }) => {
  console.log(auth)
  return(
  <div className="Home">
    <div className="new-index">
      <p className="resume-rp"><FaQuoteLeft className="quote-icons" /> Nous sommes en 2062, la "Dernière Guerre" a ravagé le monde entier et les dernières populations sont maintenant réunies dans des citadelles où règne la loi martiale. <FaQuoteRight className="quote-icons" /></p>
      <p className="resume-game">Citadelle est un jeu sur navigateur de stratégie en temps réel massivement multijoueur dans un univers post-apocalyptique. Vous contrôlez une petite citadelle avec l'objectif de l'agrandir progressivement: technologiquement, démographiquement, offensivement et défensivement parlant.</p>
    </div>
  </div>
);}

export default connect(mapStateToProps)(Home);
