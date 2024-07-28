"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionId = exports.setSessionId = void 0;
require("dotenv/config");
var node_uuid_1 = require("node-uuid");
var continuation_local_storage_1 = require("continuation-local-storage");
var myRequest = (0, continuation_local_storage_1.createNamespace)(process.env.SESSION_NAMESPACE);
var setSessionId = function (req, res, next) {
    myRequest.run(function () {
        myRequest.set('sessionId', (0, node_uuid_1.v1)());
        next();
    });
};
exports.setSessionId = setSessionId;
var getSessionId = function () {
    var session = (0, continuation_local_storage_1.getNamespace)(process.env.SESSION_NAMESPACE);
    return session.get('sessionId');
};
exports.getSessionId = getSessionId;
