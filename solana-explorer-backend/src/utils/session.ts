import 'dotenv/config';
import { v1 as uuid } from 'node-uuid';
import { createNamespace, getNamespace } from 'continuation-local-storage';

const myRequest = createNamespace('solana-explorer-backend');

const setSessionId = (req: any, res: any, next: any) => {
    myRequest.run(() => {
        myRequest.set('sessionId', uuid());
        next();
    });
};

const getSessionId = () => {
    const session = getNamespace('solana-explorer-backend');
    return session?.get('sessionId');
};

export {
    setSessionId,
    getSessionId
};
