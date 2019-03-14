import socket from './config';

export const on = {
  retrieveUsersFromDB: callback =>
    socket.on('retrieveUsersFromDB', users => callback(users)),
  retrieveUserFromDB: callback =>
    socket.on('retrieveUserFromDB', user => callback(user))
};

export const emit = {
  getUsers: () => socket.emit('getUsers'),
  getUserById: userId => socket.emit('getUserById', userId)
};
