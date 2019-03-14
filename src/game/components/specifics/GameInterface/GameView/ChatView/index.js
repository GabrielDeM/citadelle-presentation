import React from 'react';
import { connect } from 'react-redux';

import './ChatView.scss';
import { mapDynamicState } from '../../../../../../global/utils';
import Chat from './Chat';
import ChatButton from './ChatButton';

const mapStateToProps = mapDynamicState('game: chat: view');

const mapDispatchToProps = dispatch => ({

});

class ChatView extends React.Component {
  render() {
    const { view } = this.props;
    const viewObj = { Chat, ChatButton };
    const View = viewObj[view];
    return (
      <div className="ChatView">
        <div className="chatview">
          <View />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatView)
