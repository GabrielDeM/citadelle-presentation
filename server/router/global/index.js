const gameRoutesStr = require('../game');
const siteRoutesStr = require('../site');
const routesStr = `${siteRoutesStr} ${gameRoutesStr}`;
const routesArr = routesStr.split(/\s/);

module.exports = routesArr;
