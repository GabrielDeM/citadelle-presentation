import { blacklist, replacing, dragonBlacklist, dragonReplacing } from '../../data';
import { random } from '../../../global/utils';
import { botInteractions } from './botMessages';

export const blackFilter = (message, self) => {
  dragonBlacklist.forEach(blackword => {
    const regex = new RegExp(blackword);
    if(regex.test(message.content)) {
      message.content = replacer(message.content, blackword);
      const badThing = blackword.split(' ')[2];
      setTimeout(() => {
        const botMessage = {
          username: 'bot-event',
          content: `Comment ôse-tu dire que les dragons sont ${badThing}?! Je te jure que je vais prendre tout t'es cristaux, détruire ta citadelle et je vais supprimer ton compte!!! >:c`,
          timestamp: Date.now(),
        };
        botInteractions(botMessage, self);
      }, 0);
    }
  });
  blacklist.forEach(blackword => {
    const regex = new RegExp(` ([\\W]|[0-9])*${blackword}([\\W]|[0-9])* `, 'g');
    if(regex.test(` ${message.content} `))
      message.content = replacer(` ${message.content} `, regex);
  });
  return message.content;
}

export const replacer = (message, regex) => {
  if(typeof regex === 'string') {
    const badPhraseFrags = regex.split(' ');
    regex = new RegExp(regex, 'g');
    const number = Math.round(random(0, dragonReplacing.length - 1));
    const newStr = `${badPhraseFrags[0]} ${badPhraseFrags[1]} ${dragonReplacing[number]}`;

    return message.replace(regex, newStr);
  }
  const number = Math.round(random(0, replacing.length - 1));
  return message.replace(regex, replacing[number]);
}
