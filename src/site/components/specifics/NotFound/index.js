import React from 'react'

// data
import messages from '../../../data/notFoundMessages';

import './Home.scss';

class NotFound extends React.Component {

  notFoundMessageRandom = () => {
    const item = messages[Math.floor(Math.random()*messages.length)];

    return item;
  }

  render() {

    // Permet d'envoyer un des messages prédéfinis aléatoirement lorsque l'URL ne correspond pas à une route valide

    return (
      <div className="NotFound">
        <div className="new-index">
          <h2>{this.notFoundMessageRandom()}</h2>
        </div>
      </div>
    )
  }
}

export default NotFound;
