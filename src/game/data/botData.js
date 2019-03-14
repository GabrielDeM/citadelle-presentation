export const botData = {
  specials: {
    welcome: 'Bienvenue dans votre citadelle!',
    '/': 'Commande incorrecte, veuillez en entrez une autre.',
  },
  actions: {
    bonjour: 'Bonjour, que voulez-vous?',
    english: 'Why do you speak english in a french game?',
    zougui: 'zougui, c\'est mon créateur, ne parlez pas mal de lui si vous voulez pas que je détruise votre citadelle!',
    cristaux: 'Les cristaux vous servent pour tout un tas de chose! Si vou en voulez n\'hésitez pas à me demander, j\'ai toujours un stock de cristaux quelque part, je pourrais vous en fournir, par contre cela ne sera pas gratuit, je vous donnerais 1 cristal en échange de 2 cristaux',
    cristal: 'Un cristal? désoler je ne vois pas de quoi vous parlez',
    dragon: 'les dragons sont si majestueux, si tu ôse dire du mal des dragons je n\'hésiterais pas à voler t\'es cristaux, détruire ta citadelle et pour finir je supprimerais ton compte!',
    'private stream': 'salut les kryptoniens! je suis un nouvel étudiant de la promo krypton et je m\'appelle x-89',
    'private stream 2': 'De quoi? j\'ai 5 mois de retard? je vois pas de quoi tu parles.',
    'on stream': 'Ah... si j\'avais su je me serais habillé...',
  },
  multi: {
    anglais: 'english',
    hello: 'english',
    z: 'zougui',
    zou: 'zougui',
    dragons: 'dragon',
    dergs: 'dragon',
    derg: 'dragon',
    'public stream': 'on stream',
  },
  unregexable: {
    '(╯°□°）╯︵ ┻━┻': '┬─┬ ノ( ゜-゜ノ)',
    '┬─┬ ノ( ゜-゜ノ)': '(╯°□°）╯︵ ┻━┻',
  },
};

/*
const botData = {
  specials: { // éxécuter sur event "special"
    key: 'value', // return la value si la key est présente dans la phrase tester
  },
  actions: { // éxécuter quand un user envoie un message
    key: 'value',
  },
  multi: { // si vous avez plusieurs keys qui renvoient le même message, mettez les keys "secondaire" et la "value" doit être égale à la key présente dans les actions
    key: 'value',
  },
  unregexable: { // key qui ne sont pas testable via regex
    key: 'value',
  },
}
*/
