import log4js from 'log4js';
import { getSessionId } from './session';
import os from 'os';
const HOST = os.hostname();

const initLog4js = () => {
    const layout = {
        type: 'pattern',
        pattern: '%[[%d] [%p] %c [%x{reqId}]%] %m',
        tokens: {
            reqId: () => getSessionId()
        }
    };
    const appenders = {
        console: { type: 'console', layout },
        accessLog: { type: 'dateFile', filename: `logs/solana-explorer-backend-${HOST}.log`, compress: true, layout },
        errorLog: { type: 'dateFile', filename: `logs/solana-explorer-backend-${HOST}.error`, compress: true, layout },
        logs: { type: 'logLevelFilter', appender: 'accessLog', level: 'info', layout },
        errors: { type: 'logLevelFilter', appender: 'errorLog', level: 'error', layout },
    };
    const defaultAppenders = ['console', 'logs', 'errors'];
    log4js.configure({
        appenders,
        categories: {
            default: { appenders: defaultAppenders, level: ('info') },
        },
    });
};

const logger = log4js.getLogger();

export { initLog4js, logger };
