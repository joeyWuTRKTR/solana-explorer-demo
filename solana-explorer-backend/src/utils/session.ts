import 'dotenv/config';
import { v1 as uuid } from 'node-uuid';
import { createNamespace, getNamespace } from 'continuation-local-storage';

const myRequest = createNamespace(process.env.SESSION_NAMESPACE);

const setSessionId = (req, res, next) => {
    myRequest.run(() => {
        myRequest.set('sessionId', uuid());
        next();
    });
};

const getSessionId = () => {
    const session = getNamespace(process.env.SESSION_NAMESPACE);
    return session.get('sessionId');
};

export {
    setSessionId,
    getSessionId
};
