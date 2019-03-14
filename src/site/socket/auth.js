import socket from './config';

export const on = {
  duplicatedData: callback => socket.on('duplicatedData', duplicatedData => callback(duplicatedData)),
  userCreated: callback => socket.on('userCreated', userCreated => callback(userCreated)),
  logged: callback => socket.on('logged', user => callback(user)),
  userNotExist: callback => socket.on('userNotExist', message => callback(message)),
  wrongPassword: callback => socket.on('wrongPassword', message => callback(message)),
};

export const emit = {
  signup: formData => socket.emit('signup', formData),
  login: formData => socket.emit('login', formData),
  editUserById: formData => socket.emit('editUserById', formData),
};
