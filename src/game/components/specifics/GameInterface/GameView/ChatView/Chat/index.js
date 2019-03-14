import React from 'react';
import { connect } from 'react-redux';

import './Chat.scss';
import { mapDynamicState } from '../../../../../../../global/utils';
import {
  checkTabs,
  filterMessages,
  scrollToLastMessage,
  botInteractions,
  addMessage,
  quiz,
  addMessageToState
} from '../../../../../../utils/bot';
import base from '../../../../../../../config/rebase';
import { botData } from '../../../../../../data';
import { chat } from '../../../../../../../global/store/game/actions';
import Messages from './Messages';
import Input from './Input';
import Tabs from './Tabs';

const {
  setBotContext,
  setQuizDifficulty,
  setCurrentQuiz,
  setCurrentQuestionIndex,
  setUserAnswers,
} = chat;

const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: 'chat: tab botContext difficulty currentQuiz currentQuestionIndex userAnswers',
});

const mapDispatchToProps = dispatch => ({
  setBotContext: context => dispatch(setBotContext(context)),
  setQuizDifficulty: difficulty => dispatch(setQuizDifficulty(difficulty)),
  setCurrentQuiz: quiz => dispatch(setCurrentQuiz(quiz)),
  setCurrentQuestionIndex: index => dispatch(setCurrentQuestionIndex(index)),
  setUserAnswers: answers => dispatch(setUserAnswers(answers)),
});

class Chat extends React.Component {

  botData = botData;

  state = {
    messages: [],
    botDiscussion: [],
    filteredMessages: [],
    personalBotData: {},
  };

  componentDidMount = () => {
    this.syncState('messages');
    const botMessage = {
      username: 'bot-event',
      content: `welcome`,
      timestamp: Date.now(),
    };
    botInteractions(botMessage, this);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { messages: prevMessages, botDiscussion: prevBotDiscussion } = prevState;
    const { messages, botDiscussion } = this.state;
    const { tab } = this.props;

    scrollToLastMessage(prevState, this);
    if(prevProps.tab !== tab) checkTabs(this);
    if(prevMessages !== messages ||
      prevBotDiscussion !== botDiscussion) filterMessages(this);
  }

  syncState = (path, asArray = true, state) => {
    base.syncState(path, {
      context: this,
      state: state || path.split('/')[0],
      asArray,
      then() {
        filterMessages(this)
      }
    });
  }

  addMessage = message => {
    const { botContext } = this.props;
    message.content = message.content.trim();
    switch (botContext) {
      case 'chat':
        addMessage(message, this);
        break;
      case 'joke':
        break;
      case 'quiz':
        addMessageToState(message, this, 'botDiscussion');
        quiz(message, this);
        break;

      default: return;
    }
  }

  quiz = message => quiz(message, this);

  render() {
    const { addMessage } = this;
    const { filteredMessages } = this.state;

    return (
      <div className="Chat">
        <div className="chat">
          <Messages messages={filteredMessages} />
          <Input addMessage={addMessage} />
          <Tabs />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
