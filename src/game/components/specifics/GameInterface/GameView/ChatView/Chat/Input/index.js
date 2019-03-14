import React from 'react'
import { connect } from 'react-redux'

import './Input.scss';
import { mapDynamicState } from '../../../../../../../../global/utils';

const mapStateToProps = mapDynamicState('global: auth: user');

const mapDispatchToProps = dispatch => ({

});

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 200,
      currentMessage: '',
    }
    this.input = React.createRef();
  }

  handleChange = e => {
    const { value } = e.target;
    const length = 200 - value.length;
    if(length >= 0) this.setState({ length, currentMessage: value });
  }

  handleSubmit = e => {
    const { user, addMessage } = this.props;
    e.preventDefault();
    const message = {
      username: user.username,
      content: this.state.currentMessage,
      timestamp: Date.now(),
    };
    addMessage(message);
    this.setState({ length: 200, currentMessage: '' });
  }

  render() {
    const { handleChange, handleSubmit, input } = this;
    const { currentMessage, length } = this.state;

    return (
      <div className="Input">
        <div className="input">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={currentMessage}
              maxLength={200}
              required
              onChange={handleChange}
              ref={input}
              autoFocus={true}
              placeholder="Message"
            />
            <div className="help">{ length }</div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
