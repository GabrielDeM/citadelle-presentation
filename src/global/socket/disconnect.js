import socket from './config';

export const emit = {
  ownDisconnect: userId => {console.log(userId);socket.emit('disconnect', userId)},
};

export default socket;
