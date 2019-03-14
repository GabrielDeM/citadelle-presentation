const io = require('../../config')('socket');
const mongoose = require('../../mongoose');
const { addUser, removeUser } = require('../users');
const { errorLogger } = require('../../utils');
const { signup, loginNotMatch, loginNoUser, disconnect } = require('./error-log');

const on = {
  signup: socket => socket.on('signup', formData => {console.log(formData)
    mongoose.User.signup(formData)
    .then(() => {console.log('signup');socket.emit('userCreated')})
    .catch(err => {
      let errorMessage;
      let userError = {
        email: formData.email,
        username: formData.username,
      };
      if(/duplicate/.test(err.errmsg)) {
        const duplicatedData = err.errmsg.split('"')[1].split('"')[0];
        socket.emit('duplicatedData', `${duplicatedData} est déjà utiliser`);

        const errorInfo = /@/.test(duplicatedData)
          ? 'email'
          : 'username';
        errorMessage = `Duplicated data: ${errorInfo}`;

        userError = {
          ...userError,
          duplicated: duplicatedData,
        };
      } else errorMessage = 'signup error';
      const e = new Error(errorMessage);
      const errorObject = {
        err,
        errorMessage,
        userError,
        stack: e,
      };
      errorLogger(signup(errorObject));
    })}
  ),
  login: socket => socket.on('login', formData => mongoose.User.login(formData)
    .then(userInDB => {
      userInDB.comparePassword(formData.password, (err, match) => {
        const { username, email, score, _id, hasCitadel } = userInDB;
        let newUserObject = {
          username,
          email,
          online: true,
          score,
          _id,
          hasCitadel,
        };
        if(match) {
          socket.emit('logged', newUserObject);
          mongoose.User.setOnline(_id, true);
          addUser({
            _id,
            socketId: socket.conn.id,
          });
        } else {
          const e = new Error('Wrong password');
          const errorObject = {
            err,
            formData,
            stack: e,
          };
          errorLogger(loginNotMatch(errorObject));
          socket.emit('wrongPassword', 'Le mot de passe est incorrecte');
        }
      });
    })
    .catch(err => {
      const e = new Error(err);
      let errorMessage = 'login error';
      let severity = 3;
      if(/comparePassword/.test(e.stack)) {
        errorMessage = `there is no user with the email "${formData.email}"`;
        severity = 1;
      }
      const errorObject = {
        severity,
        errorMessage,
        err,
        formData,
        stack: e,
      };
      errorLogger(loginNoUser(errorObject));
      socket.emit('userNotExist', `Il n'y a aucun utilisateur avec pour email "${formData.email}"`)
    })
  ),

  disconnect: socket => socket.on('disconnect', () => {
    const id = removeUser(socket.conn.id);
    id && mongoose.User.setOnline(id, false)
    .then(() => console.log('User disconnected'))
    .catch(err => {
      errorLogger(disconnect(err, new Error('disconnect error')));
    })
  }),
};

const emit = {

};

module.exports = {
  ...on,
  ...emit,
};
