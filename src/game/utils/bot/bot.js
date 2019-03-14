import { addMessageToState, botInteractions } from './';

export const bot = self => {
  return {
    say: message => {
      const botMessage = {
        username: 'bot',
        content: message,
        timestamp: Date.now(),
      };
      addMessageToState(botMessage, self, 'botDiscussion');
    },
    event: eventKey => {
      const botMessage = {
        username: 'bot-event',
        content: eventKey,
        timestamp: Date.now(),
      };
      botInteractions(botMessage, self);
    }
  }
}
