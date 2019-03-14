import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

import './UserPage.scss';
import { mapDynamicState } from '../../../../../global/utils';
import { emit, on } from '../../../../socket/user';
import {
  emit as emitCitadel,
  on as onCitadel
} from '../../../../socket/citadel';

const mapStateToProps = mapDynamicState('global: auth: user');

const mapDispatchToProps = dispatch => ({});

class UserPage extends React.Component {
  state = {
    user: [],
    citadels: []
  };

  componentDidMount = () => {
    const { userId } = this.props.match.params;
    console.log('paramsawdadawd: ', this.props);

    emit.getUserById(userId);
    on.retrieveUserFromDB(user => {
      this.setState({
        user
      });
    });

    emitCitadel.getAllCitadelsByUser(userId);
    onCitadel.getCitadelsFromDB(citadels => {
      this.setState({
        citadels
      });
    });
  };

  render() {
    const { user, citadels } = this.state;
    const name = user.username;
    return (
      <div className="UserPage">
        {user && (
          <div className="new-index">
            <div className="userPage">
              <div className="left-content">
                <Avatar
                  src={user.avatar && user.avatar}
                  alt="avatar"
                  className="user-avatar"
                >
                  {!user.avatar && name && name.charAt(0)}
                </Avatar>
                <h2>{name}</h2>
                <h3>Citadelles:</h3>
                {citadels.map(citadel => (
                  <Link
                    key={citadel._id}
                    to={`/backoffice/citadels/${citadel._id}`}
                    className="userpage-link"
                  >
                    <h4>{citadel.name}</h4>
                    <span className="slider" />
                  </Link>
                ))}
              </div>
              <div className="right-content">
                <ul className="userpage-ul">
                  <li className="userpage-li">
                    <span className="userpage-span">Email:</span> {user.email}
                  </li>
                  <li className="userpage-li">
                    <span className="userpage-span">Score:</span> {user.score}
                  </li>
                  <li className="userpage-li">
                    <span className="userpage-span">Résumé:</span> {user.resume}
                  </li>
                  <li className="userpage-li">
                    <span className="userpage-span">Statut:</span>{' '}
                    {user.online ? 'Connecté' : 'Non connecté'}
                  </li>
                </ul>
              </div>
            </div>
            <form action="">
              {/* Changer le pseudo */}
              {/* <label htmlFor=""></label>
                <input value={name} type="text"/> */}

              {/* <label htmlFor=""></label>
                <input value={} type="text"/>

                <label htmlFor=""></label>
                <input value={} type="text"/> */}
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
