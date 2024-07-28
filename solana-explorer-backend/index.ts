import 'dotenv/config';
import {initLog4js, logger} from "./src/utils/logger";
import express, { Request, Response } from 'express';
import {setSessionId} from "./src/utils/session";
import {getBlock, getBlockList, getTransaction} from "./src/solana";
import {httpLogger} from "./src/utils/httpLogger";
import * as process from "node:process";

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});
app.use(setSessionId);
app.use(httpLogger);

app.get('/', async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get('/recentBlockList', async (req: Request, res: Response) => {
  try {
    const result = await getBlockList();
    res.send(result);
  } catch (error) {
    logger.error(`getBlockList error: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/block/:blockNumber', async (req: Request, res: Response) => {
  const { blockNumber } = req.params;
  try {
    const result = await getBlock(Number(blockNumber));
    res.send(result);
  } catch (error) {
    logger.error(`getBlock error: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/tx/:signature', async (req: Request, res: Response) => {
  const { signature } = req.params;
  try {
    const result = await getTransaction(signature);
    res.send(result);
  } catch (error) {
    logger.error(`getTransaction error: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT, () => {
  initLog4js();
  logger.info(`Server is running on port ${process.env.PORT}`);
});
