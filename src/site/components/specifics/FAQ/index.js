import React from 'react'

// data
import faqBat from '../../../data/faqBat';

import './FAQ.scss';

const Faq = () => (
  <div className="FAQ">
  <div className="bg-img"></div>
    <div className="new-index">
      <h2 className="faq-h2">Ressources</h2>
      <div className="faq-ressources">
        <img src={require("../../../../game/utils/img/fer.png")} alt="fer" width="64px" height="48px" />
        <img src={require('../../../../game/utils/img/fuel.png')} alt="petrole" width="64px" height="64px" />
        <img src={require('../../../../game/utils/img/ammo.png')} alt="ammo" width="64px" height="48px" />
      </div>
      <p className="faq-p">Afin de construire des bâtiments ou de recruter des unités, il vous faut des ressources. Vous recevez des ressources automatiquement par vos bâtiments de production (Plate-forme pétrolière, Mine de Fer et Usine de Munition). Ces ressources, vous les recevez également lorsque vous n'êtes pas connecté sur votre compte. La quantité de ressources que vous obtenez dépend du niveau de vos bâtiments de production.</p>
      <h2 className="faq-h2">Bâtiments</h2>
        {
          faqBat.map(bat => (
            <div key={bat.name} className="faq-batiments">
              <h3 className="faq-h3">{bat.name}</h3>
              <img className="bat-image" src={require(`../../../utils/img/${bat.img}.jpg`)} alt=""/>
              <p className="faq-p">{bat.resume}</p>
            </div>
          ))
        }
      <h2 className="faq-h2">Unités</h2>
      <h3 className="faq-h3">Soldats</h3>
      <img src={require('../../../utils/img/soldat.png')} className="faq-img" alt="soldat"/>
      <h2 className="faq-h2">Carte</h2>
      <p className="faq-p">Sert à voir la position de sa citadelle sur la carte</p>
      <img src={require('../../../utils/img/carte.png')} className="faq-img" alt="carte"/>
    </div>
  </div>
);

export default Faq;
