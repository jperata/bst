#!/usr/bin/env node
"use strict";
const bespoke_client_1 = require("../lib/client/bespoke-client");
const arg_helper_1 = require("../lib/core/arg-helper");
const global_1 = require("../lib/core/global");
const url_mangler_1 = require("../lib/client/url-mangler");
const lambda_runner_1 = require("../lib/client/lambda-runner");
global_1.Global.initialize();
let argHelper = new arg_helper_1.ArgHelper(process.argv);
let command = "help";
if (argHelper.orderedCount() === 0) {
    console.error("No command specified. Must be first argument.");
}
else {
    command = argHelper.forIndex(0);
}
if (command === "proxy") {
    if (argHelper.orderedCount() < 3) {
        console.error("For proxy, must specify node ID and port to forward to!");
        process.exit(1);
    }
    let agentID = argHelper.forIndex(1);
    let targetPort = parseInt(argHelper.forIndex(2));
    let serverHost = argHelper.forKeyWithDefaultString("serverHost", global_1.Global.BespokeServerHost);
    let serverPort = argHelper.forKeyWithDefaultNumber("serverPort", 5000);
    let bespokeClient = new bespoke_client_1.BespokeClient(agentID, serverHost, serverPort, targetPort);
    bespokeClient.connect();
}
if (command === "proxy-url") {
    let agentID = argHelper.forIndex(1);
    let url = argHelper.forIndex(2);
    let mangler = new url_mangler_1.URLMangler(url, agentID);
    let newUrl = mangler.mangle();
    console.log("");
    console.log("Use this URL in the Alexa Skills configuration:");
    console.log("");
    console.log("   " + newUrl);
    console.log("");
}
if (command === "proxy-lambda") {
    let agentID = argHelper.forIndex(1);
    let handler = argHelper.forIndex(2);
    let serverHost = argHelper.forKeyWithDefaultString("serverHost", global_1.Global.BespokeServerHost);
    let serverPort = argHelper.forKeyWithDefaultNumber("serverPort", 5000);
    let lambdaPort = 10000;
    let bespokeClient = new bespoke_client_1.BespokeClient(agentID, serverHost, serverPort, lambdaPort);
    bespokeClient.connect();
    let lambdaRunner = new lambda_runner_1.LambdaRunner();
    lambdaRunner.start(handler, lambdaPort);
}
if (command === "sleep") {
    console.error("Not until Brooklyn!");
    process.exit(1);
}
if (command === "help") {
    console.log("");
    console.log("Usage: bst <command>");
    console.log("");
    console.log("Commands:");
    console.log("bst proxy <node-id> <service-port>        Forwards traffic from Alexa to your local Skill service, listening on <service-port>");
    console.log("bst proxy-url <node-id> <alexa-url>       Takes a normal URL and modifies to include the <node-id> in the query string");
    console.log("bst proxy-lambda <node-id> <handler-file> Runs a lambda as a local service. Must be the full path to the lambda file.");
    console.log("");
}
//# sourceMappingURL=bst.js.map