import { botInteractions, blackFilter, commandDispatcher } from './';

export const addMessage = (message, self, overTab) => {
  if(message.content.charAt(0) === '/') {
    commandDispatcher(message, self);
    return;
  }
  const { tab, botContext } = self.props;

  if(message.username !== 'bot') message.content = blackFilter(message, self);

  let stateProp;
  overTab = overTab || tab;
  if(overTab === 'chatbot') {
    stateProp = 'botDiscussion';
    botContext === 'chat' && botInteractions(message, self);
  } else if(overTab === 'public') stateProp = 'messages';


  addMessageToState(message, self, stateProp);
}

export const addMessageToState = (message, self, stateProp) => {
  if(message.content.charAt(0) === '/') {
    commandDispatcher(message, self);
    return;
  }
  let messages = [
    ...self.state[stateProp],
    message,
  ];

  if(messages.length > 75) messages.shift();
  self.setState({ [stateProp]: messages });
}
