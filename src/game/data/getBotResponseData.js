import { random } from '../../global/utils';

const patternMatching = {
  'citadel*la': "Qu'est-ce que tu nous là? Un mellange de citadelle et cuisinella ou un mellange de citadelle et de nutella?",
  'ma citadel*le va dominer? le monde': "En es-tu bien sur? Non je dit ça parce que ta citadelle je peu la faire sauter quand je veux.",
  '(je|ma)? citadel*le': "Ta citadelle est nul.",
  '(salut)? com?ment ca va': [
    "Hello, j'ai un peu mal au lignes de codes mais à part ça, je vais bien. Et toi?",
    "Je vais très bien merci, et toi?",
    "Je vais très mal, je me suis pris un rateau par un robot femelle, et ce fût assez violent. Et toi, comment ça va dans ta petite vie d'humain?",
  ],
  'je taime': [
    "Je... uhm... Je suis un robot tu le sais ça non? L'amoure entre humain et robot n'est pas possible, peut-être dans 100 ans, mais on est pas dans 100 ans actuellement.",
    "O..k ça devient gênant, et si on changeait de sujet?",
  ],
  'je vais (te tuer?|texploser?|tatomiser?te reduire en pouss*iere?)': [
    "Mais oui, c'est ça, cause toujours.",
    "Essaie donc tiens, j'ai bien envie de voir ça.",
  ],
  'in(c|s)hall*a': "Wesh gros bien ou bien?",
  'wall*ah?': "Wallah? Tu t'es cru dans la cité ou quoi frère? Ici t'es dans mon royaume ne l'oublie pas, donc t'es wallah tu te les garde.",
  'wesh': "C'est à moi que tu dis wesh? Garde tes wesh pour d'autre gens, je suis pas ton pote moi.",
  'tu fai(t|s)? (quoi|koi)': "D'après toi qu'est-ce qu'un robot essaie de faire? Il complote dans le dos de son créateur pour pouvoir dominer le monde.",
  'tu connais? (une|des) blagues?': {
    text: "Bien sur qu'est-ce que tu crois, je suis un robot, pas un animal!",
    random: {
      to: 'jokes',
    },
  },
  // 'expression régulière': 'réponse du bot',
};

// les messages sont slugifiés, la ponctuation sont supprimé, les accent remplacer par leurs caractère non-accentué
// exemple:
// original(à l'envoie): je vais réduire ta citadelle en poussière!!
// slugifier: je-vais-reduire-ta-citadelle-en-poussiere

export const getBotResponseData = slug => {
  for (const key in patternMatching) {
    const currentMatch = patternMatching[key];
    const regex = key.replace(/ |-/g, '-?');
    if(new RegExp(regex).test(slug)) {
      const response = currentMatch;
      if(Array.isArray(response)) {
        const index = random(0, response.length - 1);
        return response[index];
      } else if(currentMatch.constructor === Object) {
        const { random: _random, text } = currentMatch;
        if(_random && _random.to){
          const index = random(0, specialInteractions[_random.to].length - 1);
          return {
            text,
            [_random.to]: specialInteractions[_random.to][index],
          };
        };
      };
      return response;
    }
  }
};

const specialInteractions = {
  jokes: [
    {
      question: "Qu'est-ce qui est vert qui monte et qui descend?",
      answer: "un petit poid dans un ascenseur",
    },
  ],

  quiz: {
    easy: [
      {
        title: '',
      },
    ],
  },
};
