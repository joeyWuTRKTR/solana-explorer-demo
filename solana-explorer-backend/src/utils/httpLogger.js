"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = void 0;
var morgan_1 = __importDefault(require("morgan"));
var morgan_json_1 = __importDefault(require("morgan-json"));
var logger_1 = require("./logger");
morgan_1.default.token('res-body', function (_req, res) { return res.__custombody__; });
morgan_1.default.token('req-body', function (req) { return JSON.stringify(req.body); });
var format = (0, morgan_json_1.default)({
    method: ':method',
    url: ':url',
    status: ':status',
    contentLength: ':res[content-length]',
    reqBody: ':req-body',
    resBody: ':res-body',
    responseTime: ':response-time'
});
var httpLogger = (0, morgan_1.default)(format, {
    stream: {
        write: function (message) {
            var _a = JSON.parse(message), method = _a.method, url = _a.url, status = _a.status, contentLength = _a.contentLength, responseTime = _a.responseTime, reqBody = _a.reqBody, resBody = _a.resBody;
            logger_1.logger.info('access log', {
                url: url,
                method: method,
                reqBody: reqBody,
                status: Number(status),
                contentLength: contentLength,
                resBody: resBody,
                responseTime: Number(responseTime),
            });
        }
    }
});
exports.httpLogger = httpLogger;
