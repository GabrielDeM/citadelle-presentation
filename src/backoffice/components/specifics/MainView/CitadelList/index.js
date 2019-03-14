import React from 'react'
import { connect } from 'react-redux'

import './CitadelList.scss';
import { mapDynamicState } from '../../../../../global/utils';
import List from './List';
import { emit, on } from '../../../../socket/citadel';

const mapStateToProps = mapDynamicState('game: citadel: citadel');

const mapDispatchToProps = dispatch => ({

});

class UserList extends React.Component {

  state = {
    citadels: [],
  }

  componentDidMount = () => {
    emit.getAllCitadels();
    on.getCitadelsFromDB(citadels => {
      this.setState({
        citadels,
      })
    });
  }

  render() {

    const { citadels } = this.state;
    return (
      <div className="CitadelList">
        <div className="new-index">
          <div className="citadelList">
            <h2>Liste des Citadelles</h2>
            <div className="userlist-div">
              {
                citadels.map(citadel => (
                  <List key={citadel.name} name={citadel.name} score={citadel.score} {...citadel} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
