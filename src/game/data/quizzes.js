export const quizzes = {
  easy: {
    difficulty: 'easy',
    name: 'facile',
    index: 1,
    quizzes: [{
      index: 1,
      title: "Animaux célèbres - I",
      questions: [
        {
          question: "Dans le film d'animation L'Âge de glace, qu'est-ce qui échappe à l'écureuil Scrat ?",
          choices: [
            'Un gland',
            'Une pierre',
            'Un os',
            'Une bille',
          ],
          answer: 1,
        },
        {
          question: "Quel personnage de Disney, ami de Mickey Mouse, est un chien anthropomorphe très maladroit ?",
          choices: [
            'Dingo',
            'Félix',
            'Donald',
            'Mortimer',
          ],
          answer: 1,
        },
        {
          question: "Dans le célèbre dessin animé, qui le chat Tom poursuit-il sans cesse ?",
          choices: [
            'Jerry',
            'Titi',
            'Manny',
            'Grosminet',
          ],
          answer: 1,
        },
        {
          question: "Dans les deux films Babe, quel animal campe le personnage principal ?",
          choices: [
            'Un cochon',
            'Un mouton',
            'Un chien',
            'Une chèvre',
          ],
          answer: 1,
        },
      ],
    },
    {
      index: 2,
      title: "Le chocolat - I",
      questions: [
        {
          question: "Quel chocolat, parfois mélangé avec des épices, contient le moins de sucre ?",
          choices: [
            'Noir',
            'Blanc',
            'Au lait',
            'Praliné',
          ],
          answer: 1,
        },
        {
          question: "Quel chocolat, riche en acides gras saturés, est le plus amère ?",
          choices: [
            'Noir',
            'Au lait',
            'Praliné',
            'Blanc',
          ],
          answer: 1,
        },
        {
          question: "Quel chocolat, généralement préféré par les puristes, ne contient pas de lait ?",
          choices: [
            'Noir',
            'Blanc',
            'Au lait',
            'Praliné',
          ],
          answer: 1,
        },
      ],
    },
  ]},

  normal: {
    difficulty: 'normal',
    name: 'normal',
    index: 2,
    quizzes: [{
      index: 1,
      title: "Animaux célèbres - I",
      questions: [
        {
          question: "Des spécimens de quelle race de chiens intéressent tout particulièrement Cruella d'Enfer ?",
          choices: [
            'Dalmatien',
            'Berger allemand',
            'Fox-terrier',
            'Jack Russel',
          ],
          answer: 1,
        },
        {
          question: "Quelle marque est représentée par un chat blanc généralement habillé de couleur rose ?",
          choices: [
            'Hello Kitty',
            'Hola Ginola',
            'Santa Maria',
            'Bravo Sammy',
          ],
          answer: 1,
        },
        {
          question: "Dans le film d'animation de Pixar 1001 Pattes, quel insecte est Tilt, le personnage principal ?",
          choices: [
            'Une fourmi',
            'Un cafard',
            'Une libellule',
            'Une araignée',
          ],
          answer: 1,
        },
      ],
    },
    {
      index: 2,
      title: "Le chocolat - I",
      questions: [
        {
          question: "Quel est le premier pays producteur de cacao, loin devant le Ghana et l'Indonésie ?",
          choices: [
            'La Côte d\'Ivoire',
            'Le Brésil',
            'Le Mexique',
            'Le Cameroun',
          ],
          answer: 1,
        },
        {
          question: "Combien peut-on faire de récoltes par an sur un cacaoyer en bonne santé ?",
          choices: [
            'Deux',
            'Quatre',
            'Six',
            'Huit',
          ],
          answer: 1,
        },
        {
          question: "Quel chocolat, devant contenir au minimum 20 % de beurre de cacao, est le plus sucré ?",
          choices: [
            'Blanc',
            'Noir',
            'Praliné',
            'Au lait',
          ],
          answer: 1,
        },
      ],
    },
  ]},

  hard: {
    difficulty: 'hard',
    name: 'difficile',
    index: 3,
    quizzes: [{
      index: 1,
      title: "Animaux célèbres - I",
      questions: [
        {
          question: "De quel animal prénommé Roger veut-on « la peau » dans un film d'animation ?",
          choices: [
            'Un lapin',
            'Un renard',
            'Un chien',
            'Un kangourou',
          ],
          answer: 1,
        },
        {
          question: "Quel chien est devenu le rival du chat Socks en tant qu'animal de compagnie de la famille Clinton",
          choices: [
            'Buddy',
            'Snoopy',
            'Oscar',
            'Scooby',
          ],
          answer: 1,
        },
        {
          question: "Dans le dessin animé Dora l'exploratrice, comment s'appelle le renard voleur ?",
          choices: [
            'Chipeur',
            'Silver',
            'Sylvester',
            'Denver',
          ],
          answer: 1,
        },
      ],
    },
    {
      index: 2,
      title: "Le chocolat - I",
      questions: [
        {
          question: "Quelle civilisation précolombienne a la première cultivé le cacao ?",
          choices: [
            'Les Olmèques',
            'Les Africains',
            'Les Berbères',
            'Les Aztèques',
          ],
          answer: 1,
        },
        {
          question: "Quel explorateur a rapporté le cacao en Europe en 1528 ?",
          choices: [
            'Cortés',
            'Christophe Colomb',
            'Charcot',
            'Foucauld',
          ],
          answer: 1,
        },
        {
          question: "Une fois la masse de cacao pressée, quel produit est utilisé pour faire du cacao en poudre ?",
          choices: [
            'Le tourteau',
            'Le crabe',
            'Le homard',
            'La crevette',
          ],
          answer: 1,
        },
      ],
    },
  ]},

  /*insane: {
    difficulty: 'extrême',
    index: 4,
    quizzes: [],
  },*/
};

// quiz template
// {
//   title: 'titre du quiz',
//   description: 'description du quiz', //optionnel
//   questions: [
//     {
//       question: 'la question',
//       choices: [
//         'choix 1', // index 1
//         'choix 2', // index 2
//         'choix 3', // index 3
//         'choix 4', // index 4
//       ],
//       answer: 3, // doit être le numéro d'index
//     },
//   ];
// };
