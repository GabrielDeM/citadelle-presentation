import { botData, getBotResponseData } from '../../data';
import { slugify, addMessage } from './';

export const botInteractions = (message, self) => {
  if(message.username === 'bot') return;
  message.username = message.username.replace('-event', '');

  const answer = getBotAnswer(message, self);

  setTimeout(() => {
    const botMessage = {
      username: 'bot',
      content: answer,
      timestamp: Date.now(),
    };
    addMessage(botMessage, self);
  }, 0);
}

export const getBotAnswer = (message, self) => {
  const { actions, specials } = botData;
  const { content } = message;
  let answer
  // on veut renvoyer un message "special" seulement si le message a été envoyer par le bot
  if(message.username === 'bot') answer = specials[content];

  if(!answer) answer = specials[content.charAt(0)];

  // si answer n'éxiste pas on veut renvoyer le message d'une action
  if(!answer) {
    // on récupère les clées des actions
    const actionKeys = Object.keys(actions);
    actionKeys.forEach(actionKey => {
      if(new RegExp(actionKey, 'i').test(content)) answer = actions[actionKey];
    });

    // si answer n'éxiste toujours pas, on test si le message contient une clé qui fait référence à une action
    if(!answer) {
      const multiKeys = Object.keys(botData.multi);
      multiKeys.forEach(multiKey => {
        if(new RegExp(multiKey, 'i').test(content)) answer = actions[botData.multi[multiKey]];
      });
      // si answer n'éxiste toujours pas, on regarde si le message est une message non testable via regex
      if(!answer) {
        answer = botData.unregexable[content];
        // si le message n'éxiste toujours pas on slugifie le message et on renvoie un message prédéfinie (WIP)
        if(!answer) {
          const messageSlug = slugify(content);
          /*const newPersonalBotData = {
            ...self.state.personalBotData,
            [messageSlug]: getBotResponseData(messageSlug),
          }*/
          console.log(getBotResponseData(messageSlug))
        }
      }
    }
  }
  return answer || 'Je ne comprend pas ce que vous voulez dire.';
}
