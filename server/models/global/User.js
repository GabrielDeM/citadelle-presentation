const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = 10;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true
  },
  online: { type: Boolean, default: false },
  avatar: String,
  resume: {
    type: String,
    maxlength: 10000,
    trim: true
  },
  score: { type: Number, default: 0 },
  hasCitadel: { type: Boolean, default: false }
});

// middleware de mongoose, qui s'éxécute juste avant la sauvegarde des données dans la DB
const crypt = (user, next) => {
  var user = this;

  // only hash the password if it has been modified (or is new)
  // if (!user.isModified('password')) return next();

  // on génère un salt
  bcrypt.genSalt(salt, function(err, salt) {
    if (err) return next(err);

    // on créer un hash
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // on remplace le password (qui n'est pas un hash) par un hash du password
      user.password = hash;
      // on passe a l'action suivante
      next();
      return hash;
    });
  });
};

// middleware de mongoose, qui s'éxécute juste avant la sauvegarde des données dans la DB
userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // on génère un salt
  bcrypt.genSalt(salt, function(err, salt) {
    if (err) return next(err);

    // on créer un hash
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // on remplace le password (qui n'est pas un hash) par un hash du password
      user.password = hash;
      // on passe a l'action suivante
      next();
    });
  });
});

// middleware de mongoose, qui s'éxécute juste avant l'update des données dans la DB
userSchema.pre('update', function(next) {
  crypt(this, next);
});

// on ajoute une method
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  // la méthode de comparaison de 2 hash de bcrypt
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
