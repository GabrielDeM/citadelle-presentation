const bcrypt = require('bcrypt');
const io = require('../../config')('socket');
const mongoose = require('../../mongoose');
const { getUsers } = require('./error-log');
const salt = 10;

const on = {
  getUsers: socket =>
    socket.on('getUsers', () =>
      mongoose.User.getUsers()
        .then(users => socket.emit('retrieveUsersFromDB', users))
        .catch(err => getUsers(err, new Error('get users error')))
    ),

  getUserById: socket =>
    socket.on('getUserById', userId =>
      mongoose.User.getUserById(userId)
        .then(user => socket.emit('retrieveUserFromDB', user))
        .catch(err => console.log(err))
    ),

  editUserById: socket =>
    socket.on('editUserById', user => {
      bcrypt.genSalt(salt, function(err, salt) {
        if (err) throw err;

        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) throw err;

          user.password = hash;
          mongoose.User.editProfile(user)
            .then(prevUser =>
              socket.emit('logged', {
                ...prevUser,
                ...user,
                password: null,
                hasCitadel: prevUser.hasCitadel
              })
            )
            .catch(console.log);
        });
      });
    })
};

const emit = {};

module.exports = {
  ...on,
  ...emit
};
