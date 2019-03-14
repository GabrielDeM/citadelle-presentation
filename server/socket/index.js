const io = require('../config')('socket');
const { signup, login, disconnect, getUsers, getUserById, editUserById } = require('./global');
const { success } = require('../config')('color');
const {
  createCitadel,
  retrieveBuildings,
  retrieveCitadel,
  retrieveHeadquarter,
  addBuildingsData,
  retrieveBuildingsData,
  levelUpBuilding,
  getAllCitadels,
  getCitadelById,
  getAllCitadelsByUser,
  setRessources,
  setEndUpgradeTime,
} = require('./game');

io.on('connection', socket => {
  success('socket: on')
  signup(socket);
  login(socket);
  editUserById(socket);
  createCitadel(socket);
  retrieveCitadel(socket);
  retrieveHeadquarter(socket);
  retrieveBuildings(socket);
  addBuildingsData(socket);
  retrieveBuildingsData(socket);
  disconnect(socket);
  levelUpBuilding(socket);
  getUsers(socket);
  getAllCitadels(socket);
  getCitadelById(socket);
  getAllCitadelsByUser(socket);
  getUserById(socket);
  setRessources(socket);
  setEndUpgradeTime(socket);
});

const mongoose = require('../mongoose');
mongoose.Building.downgrade();
