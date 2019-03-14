export const filterMessages = self => {
  const { messages, botDiscussion } = self.state;
  const { user, tab } = self.props;
  let filteredMessages;
  if(tab === 'chatbot')
    filteredMessages = botDiscussion.filter(message => message.username === user.username || message.username === 'bot');
  else filteredMessages = messages;
  self.setState({ filteredMessages });
}

export const checkTabs = self => {
  const { tab, user } = self.props;
  scrollToLastMessage(true, self);
  if(tab === 'public') {
    self.syncState('messages');
  }
  else if(tab === 'chatbot') {
    self.syncState(`botDiscussion/${user.username}`);
    self.syncState(`botData/${user.username}`, false, 'personalBotData');
  }
}

export const scrollToLastMessage = (prevState, self) => {
  const { tab } = self.props;
  let stateProp;
  if(tab === 'public') stateProp = 'messages';
  else if(tab === 'chatbot') stateProp = 'botDiscussion';

  if(prevState === true) {
    const messages = document.getElementsByClassName('messages')[0];
    setTimeout(() => messages.scrollTop = messages.scrollHeight, 0);
    return;
  }

  if(prevState[stateProp].length > 0 && self.state[stateProp].length > 0) {
    const prevLength = prevState[stateProp].length - 1;
    const length = self.state[stateProp].length - 1;

    if(prevState[stateProp][prevLength].content !== self.state[stateProp][length].content) {
      const messages = document.getElementsByClassName('messages')[0];
      setTimeout(() => messages.scrollTop = messages.scrollHeight, 0);
    }
  } else if(prevState[stateProp].length === 0 && self.state[stateProp].length > 0) {
    const messages = document.getElementsByClassName('messages')[0];
    setTimeout(() => messages.scrollTop = messages.scrollHeight, 0);
  }
}
