/// <reference path="../typings/modules/node-uuid/index.d.ts" />
"use strict";
var uuid = require('node-uuid');
var Connection = (function () {
    function Connection(connectionHandler, socket) {
        this.connectionHandler = connectionHandler;
        this.socket = socket;
        this.uuid = uuid.v4();
        var self = this;
        // Add a 'data' event handler to this instance of socket
        this.socket.on('data', function (data) {
            console.log('DATA ' + self.socket.remoteAddress + ': ' + data);
            // Write the data back to the socket, the client will receive it as data from the server
            self.socket.write('You said "' + data + '"');
            self.connectionHandler.onReceiveCallback(self, data);
        });
        // Add a 'close' event handler to this instance of socket
        socket.on('close', function () {
            console.log('CLOSED: ' + self.remoteAddress() + ' ' + self.socket.remotePort);
            self.connectionHandler.onCloseCallback(self);
        });
    }
    Connection.prototype.remoteAddress = function () {
        return this.socket.remoteAddress;
    };
    return Connection;
}());
exports.Connection = Connection;
