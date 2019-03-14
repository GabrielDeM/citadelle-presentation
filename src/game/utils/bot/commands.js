import { addMessage } from './';
import { quizzes } from '../../data';

export const commandDispatcher = (message, self) => {
  const { setBotContext } = self.props;
  if(message.content === '/quiz') {
    setBotContext('quiz');
    setTimeout(() => {
      const botMessage = {
        username: 'bot',
        content: `Donc tu veux faire un quiz? Choisis une difficultée:`,
        timestamp: Date.now(),
      };
      addMessage(botMessage, self);

      for(const difficulty in quizzes) {
        const { index, name: difficultyName } = quizzes[difficulty];
        setTimeout(() => {
          const botMessage = {
            username: 'bot',
            content: `${index}: ${difficultyName}`,
            timestamp: Date.now(),
          };
          addMessage(botMessage, self);
        }, index * 700);
      }
    }, 0);
  } else if(message.content === '/joke') {
    setBotContext('joke');
  } else if(message.content === '/chat') {
    setBotContext('chat');
  } else {
    message.content = ` ${message.content}`;
    addMessage(message, self);
  }
}
