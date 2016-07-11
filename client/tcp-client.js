"use strict";
const net = require("net");
const global_1 = require("../service/global");
class TCPClient {
    constructor() {
    }
    transmit(host, port, data, callback) {
        var client = new net.Socket();
        console.log("TCP-CLIENT " + host + ":" + port + " Connected");
        client.setTimeout(1000, function (message) {
            console.log("TCP-CLIENT " + host + ":" + port + " TimedOut");
            callback(null, global_1.NetworkErrorType.TIME_OUT, message);
        });
        client.on("error", function (e) {
            if (e.code == "ECONNREFUSED") {
                callback(null, global_1.NetworkErrorType.CONNECTION_REFUSED, e.message);
            }
            else {
                callback(null, global_1.NetworkErrorType.OTHER, e.message);
            }
        });
        client.connect(port, host, function (info) {
            console.log("Testasdfasdf");
            client.write(data);
        });
        client.on('data', function (data) {
            callback(data);
        });
        client.on('close', function () {
            console.log('Connection closed');
        });
    }
    close() {
    }
}
exports.TCPClient = TCPClient;
//# sourceMappingURL=tcp-client.js.map