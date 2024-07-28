"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.initLog4js = void 0;
var log4js_1 = __importDefault(require("log4js"));
var session_1 = require("./session");
var os_1 = __importDefault(require("os"));
var HOST = os_1.default.hostname();
var initLog4js = function () {
    var layout = {
        type: 'pattern',
        pattern: '%[[%d] [%p] %c [%x{reqId}]%] %m',
        tokens: {
            reqId: function (logEvent) { return (0, session_1.getSessionId)(); }
        }
    };
    var appenders = {
        console: { type: 'console', layout: layout },
        accessLog: { type: 'dateFile', filename: "logs/okai-data-proxy-".concat(HOST, ".log"), compress: true, layout: layout },
        errorLog: { type: 'dateFile', filename: "logs/okai-data-proxy-".concat(HOST, ".error"), compress: true, layout: layout },
        logs: { type: 'logLevelFilter', appender: 'accessLog', level: 'info', layout: layout },
        errors: { type: 'logLevelFilter', appender: 'errorLog', level: 'error', layout: layout },
    };
    var defaultAppenders = ['console', 'logs', 'errors'];
    log4js_1.default.configure({
        appenders: appenders,
        categories: {
            default: { appenders: defaultAppenders, level: ('info') },
        },
    });
};
exports.initLog4js = initLog4js;
var logger = log4js_1.default.getLogger();
exports.logger = logger;
