import { passwordMatch } from '../utils/';

export const fields = [
  {
    field: 'username',
    content: 'Pseudo'
  },
  {
    field: 'email',
    content: 'Email',
    type: 'email'
  },
  {
    field: 'password',
    content: 'Mot de passe',
    type: 'password'
  },
  {
    field: 'confirmPassword',
    content: 'Confirmation du mot de passe',
    type: 'password'
  },
  {
    field: 'resume',
    content: 'Description'
  },
];

export const validations = [
  {
    field: 'username',
    method: 'isLength',
    args: [{
      min: 0,
      max: 40
    }],
    validWhen: true,
    message: 'Le pseudo doit contenir entre 3 et 40 caractères.'
  },
  {
    field: 'email',
    method: 'isEmail',
    validWhen: true,
    message: 'L\'email est invalide.'
  },
  {
    field: 'password',
    method: 'isLength',
    args: [{
      min: 0,
      max: 200
    }],
    validWhen: true,
    message: 'Le mot de passe doit contenir entre 8 et 200 caractères.'
  },
  {
    field: 'confirmPassword',
    method: passwordMatch,
    validWhen: true,
    message: 'Les deux mot de passes sont différent.'
  },
  {
    field: 'resume',
    method: 'isLength',
    args: [{
      min: 0,
      max: 10000
    }],
    validWhen: true,
    message: 'La description ne doit pas dépasser 10 000 caractères.'
  },
];
