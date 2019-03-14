const { inArray, replaceAll, upperCaseFirst } = require('./misc');
const { log, errorLogger } = require('./log');
const { isValidJson } = require('./json');

exports.replaceAll = replaceAll;
exports.inArray = inArray;
exports.log = log;
exports.errorLogger = errorLogger;
exports.upperCaseFirst = upperCaseFirst;
exports.isValidJson = isValidJson;
