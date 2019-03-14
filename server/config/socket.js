const { http, port } = require('./server');
const { connectSuccess, chalk, log, successC } = require('./coloredLogs');

const io = require('socket.io')(http);
console.log(port)
io.listen(port + 1, connectSuccess('Socket:success: ', `Websockets listening on port ${port + 1}`));

module.exports = io;
