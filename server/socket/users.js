const { inArray } = require('../utils');

const users = [];
/*
 * contain:
 * [
 *  {
 *    _id: <mongoDB id>
 *    socketId: <id socket.io>
 *  }
 * ]
*/
const chalk = require('chalk');

const addUser = (ids) => users.push(ids);
const removeUser = socketId => {
  const isInArray = inArray(socketId, users, 'socketId');
  return isInArray
    ? isInArray._id
    : isInArray;
}

exports.addUser = addUser;
exports.removeUser = removeUser;
