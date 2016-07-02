"use strict";
/**
 * Created by jpk on 7/1/16.
 */
var net = require('net');
var node_1 = require("./node");
var socket_handler_1 = require("./socket-handler");
var NodeManager = (function () {
    function NodeManager(port) {
        this.port = port;
        this.host = '0.0.0.0';
        this.sockets = {};
    }
    NodeManager.prototype.start = function () {
        var self = this;
        net.createServer(function (socket) {
            var socketHandler = new socket_handler_1.SocketHandler(socket, function (message) {
                var connectData = JSON.parse(message);
                var node = new node_1.Node(connectData.id, socket.remoteAddress);
                self.sockets[node.id] = socketHandler;
                socketHandler.send("ACK", null);
                self.onConnect(node);
            });
            // We have a connection - a socket object is assigned to the connection automatically
            console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort);
        }).listen(this.port, this.host);
        console.log('Server listening on ' + this.host + ':' + this.port);
    };
    return NodeManager;
}());
exports.NodeManager = NodeManager;