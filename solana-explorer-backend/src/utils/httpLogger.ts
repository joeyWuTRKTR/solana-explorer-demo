import morgan from 'morgan';
import json from 'morgan-json';
import { logger } from "./logger";

morgan.token('res-body', (_req, res) => res.__custombody__);

morgan.token('req-body', (req) => JSON.stringify(req.body));

const format = json({
    method: ':method',
    url: ':url',
    status: ':status',
    contentLength: ':res[content-length]',
    reqBody: ':req-body',
    resBody: ':res-body',
    responseTime: ':response-time'
});

const httpLogger = morgan(format, {
    stream: {
        write: (message) => {
            const {
                method,
                url,
                status,
                contentLength,
                responseTime,
                reqBody,
                resBody,
            } = JSON.parse(message);
            logger.info('access log', {
                url,
                method,
                reqBody,
                status: Number(status),
                contentLength,
                resBody,
                responseTime: Number(responseTime),
            });
        }
    }
});

export { httpLogger };
