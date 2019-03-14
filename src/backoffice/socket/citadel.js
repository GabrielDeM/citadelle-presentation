import socket from './config';

export const on = {
  getCitadelsFromDB: callback => socket.on('getCitadelsFromDB', citadels => callback(citadels)),
  getCitadelFromDB: callback => socket.on('getCitadelFromDB', citadel => callback(citadel)),
};

export const emit = {
  getAllCitadels: () => socket.emit('getAllCitadels'),
  getCitadelById: id => socket.emit('getCitadelById', id),
  getAllCitadelsByUser: userId => socket.emit('getAllCitadelsByUser', userId),
};
