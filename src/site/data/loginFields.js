export const fields = [{
    field: 'email',
    content: 'Email',
    type: 'email'
  },
  {
    field: 'password',
    content: 'Mot de passe',
    type: 'password'
  },
];

export const validations = [{
    field: 'email',
    method: 'isEmpty',
    validWhen: false,
    message: 'L\'email est requis.'
  },
  {
    field: 'email',
    method: 'isEmail',
    validWhen: true,
    message: 'L\'email est invalide.'
  },
  {
    field: 'password',
    method: 'isEmpty',
    validWhen: false,
    message: 'Le mot de passe est requis.'
  },
  {
    field: 'password',
    method: 'isLength',
    args: [{
      min: 8,
      max: 200
    }],
    validWhen: true,
    message: 'Le mot de passe doit contenir entre 8 et 200 caractères.'
  },
];
