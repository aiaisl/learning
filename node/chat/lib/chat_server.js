/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/socket.io/socket.io.d.ts" />
var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nicknames = {};
var namesUsed = [];
var currentRoom = {};
exports.listen = function (server) {
    io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', function (scoket) {
        guestNumber = assignGuestName(socket, guestNumber, nicknames, namesUsed);
        joinRoom(socket, 'Lobby');
    });
};
