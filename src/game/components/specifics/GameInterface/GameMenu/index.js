import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './GameMenu.scss';

import { mapDynamicState } from '../../../../../global/utils';
import { citadel } from '../../../../../global/store/game/actions';

const {
  createCitadel,
} = citadel;

const mapStateToProps = mapDynamicState('global: auth: user');

const mapDispatchToProps = dispatch => ({
  createCitadel: name => dispatch(createCitadel(name)),
});

class GameMenu extends React.Component {
  state = {
    citadelName: '',
  }

  handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { user, createCitadel } = this.props;
    let { citadelName } = this.state;
    citadelName = citadelName.trim();

    if(citadelName)  createCitadel({ citadelName, user });
  }

  render() {
    const { citadelName } = this.state;
    const { handleInputChange, handleSubmit } = this;
    const { user } = this.props;

    return (
      <div className="GameMenu">
        <div className="new-index">
          <form onSubmit={handleSubmit}>
            <input className="menu-field" name="citadelName" value={citadelName} onChange={handleInputChange} placeholder="Nom de la citadelle" type="text" />
            <br/>
            <button className="menu-button" type="submit">Créer une citadelle</button>
          </form>
        </div>
        { user.hasCitadel && <Redirect to="/" /> }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu)
