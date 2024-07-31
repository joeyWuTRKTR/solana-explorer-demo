import morgan from 'morgan';
import json from 'morgan-json';
import { logger } from "./logger";

const format = json({
    method: ':method',
    url: ':url',
    status: ':status',
    contentLength: ':res[content-length]',
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
