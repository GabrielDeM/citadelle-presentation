const mongoose = require('mongoose');

const citadelSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    trim: true,
    unique: true,
  },
  resources: {
    iron: { type: Number, default: 125 },
    oil: { type: Number, default: 100 },
    ammo: { type: Number, default: 70 },
  },
  population: { type: Number, default: 2 },
  unitsNumber: { type: Number, default: 2 },
  score: {
    type: Number,
    default: 0,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Citadel', citadelSchema);
