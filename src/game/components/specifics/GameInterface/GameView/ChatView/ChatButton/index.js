import React from 'react'
import { connect } from 'react-redux'

import './ChatButton.scss';
import { mapDynamicState } from '../../../../../../../global/utils';
import { chat } from '../../../../../../../global/store/game/actions';

const {
  setView,
} = chat;

const mapStateToProps = mapDynamicState('global: auth: user');

const mapDispatchToProps = dispatch => ({
  setView: view => dispatch(setView(view)),
});

class ChatButton extends React.Component {

  handleClick = () => this.props.setView('Chat');

  render() {
    return (
      <div className="ChatButton">
        <div className="chatbutton">
          <button onClick={this.handleClick}>Chat</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatButton)
