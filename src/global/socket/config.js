import openSocket from 'socket.io-client';

const port = 9001
const { protocol, hostname } = window.location;
let url = `${protocol}//${hostname}:${port}`;

const socket = openSocket(url);

export default socket;
