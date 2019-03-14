import React from 'react';
import { connect } from 'react-redux';

import './UserList.scss';
import { mapDynamicState } from '../../../../../global/utils';
import List from './List';
import { emit, on } from '../../../../socket/user';

const mapStateToProps = mapDynamicState('global: auth: user');

const mapDispatchToProps = dispatch => ({});

class UserList extends React.Component {
  state = {
    users: []
  };

  componentDidMount = () => {
    emit.getUsers();
    on.retrieveUsersFromDB(users => {
      this.setState({
        users
      });
    });
  };

  render() {
    const { users } = this.state;

    return (
      <div className="UserList">
        <div className="new-index">
          <div className="userlist">
            <h2>Liste des Joueurs</h2>
            <div className="userlist-div">
              {users.map(user => (
                <List
                  key={user.username}
                  img={user.avatar}
                  name={user.username}
                  score={user.score}
                  {...user}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
