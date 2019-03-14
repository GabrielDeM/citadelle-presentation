export const fields = [{
    field: 'name',
    content: 'Nom',
    type: 'text'
  },
  {
    field: 'email',
    content: 'Email',
    type: 'email'
  },
  {
    field: 'subject',
    content: 'Sujet',
    type: 'text'
  },
];

export const validations = [{
    field: 'name',
    method: 'isEmpty',
    validWhen: false,
    message: 'Le nom est requis.'
  },
  {
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
    field: 'subject',
    method: 'isEmpty',
    validWhen: false,
    message: 'Le sujet est requis.'
  },
  {
    field: 'subject',
    method: 'isLength',
    args: [{
      min: 3,
      max: 200
    }],
    validWhen: true,
    message: 'Le sujet doit contenir entre 3 et 200 caractères.'
  },
];
