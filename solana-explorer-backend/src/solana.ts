import solanaWeb3, {
  Commitment,
  ParsedInstruction,
  TransactionConfirmationStatus,
  TransactionVersion,
} from '@solana/web3.js';
import {logger} from "./utils/logger";

const MAINNET_BETA = solanaWeb3.clusterApiUrl('mainnet-beta');
const solanaConnection = new solanaWeb3.Connection(MAINNET_BETA);

enum SEARCH_TYPE {
  BLOCK = 'Block',
  TRANSACTION = 'Transaction'
}

type ParsedBlockTransaction = {
  result: string,
  signature: string,
  fee: number,
  computeUnitsConsumed: number,
}

type Transaction = {
  type: SEARCH_TYPE.TRANSACTION;
  signature: string;
  result: string;
  timestamp: number;
  confirmationStatus: TransactionConfirmationStatus;
  confirmations: number | null;
  slot: number;
  recentBlockhash: string;
  fee: number;
  computeUnitsConsumed: number;
  version: TransactionVersion;
  instructions: ParsedInstruction[];
  logMessages?: Array<string> | null
}

type Block = {
  type: SEARCH_TYPE.BLOCK;
  blockhash: string;
  timestamp: number;
  epoch: number;
  parentSlot: number;
  parentBlockhash: string;
  processedTransactionsCount: number;
  successfulTransactionsCount: number;
  transactions: ParsedBlockTransaction[];
}

type BasicBlockInfo = {
  blockNumber: number;
  blockhash: string;
  timestamp: number;
  processedTransactionsCount: number;
  rewards: {
      pubkey: string;
      lamports: number;
  }[];
}

export const getBlockList = async (): Promise<BasicBlockInfo[]> => {
  const currentSlot = await solanaConnection.getSlot({
    commitment: 'finalized',
  });
  const startSlot = currentSlot - 4;

  console.log(`### get currentSlot: ${currentSlot}`);

  const blockNumbers = await solanaConnection.getBlocks(startSlot, currentSlot);
  blockNumbers.sort((a, b) => b - a);

  console.log(`### get blockNumbers: ${blockNumbers}`);

  const blockInfoList = [];
  for (const blockNumber of blockNumbers) {
    const blockInfo = await solanaConnection.getParsedBlock(blockNumber, {
      commitment: 'finalized',
      maxSupportedTransactionVersion: 0,
    });

    console.log(`### get blockNumber info: ${blockNumber}`);

    const { transactions } = blockInfo;

    const processedTransactionsCount = transactions.length;

    blockInfoList.push({
        blockNumber: blockNumber,
        blockhash: blockInfo.blockhash,
        timestamp: blockInfo.blockTime,
        processedTransactionsCount,
        rewards: blockInfo.rewards.map(reward => {
            return {
                pubkey: reward.pubkey,
                lamports: reward.lamports,
            };
        }),
    });
  }

  if (blockInfoList && blockInfoList.length > 0) {
    blockInfoList.sort((a, b) => b.timestamp - a.timestamp);
  }

  return blockInfoList;
}

export const getBlock = async (blockNumber: number): Promise<Block> => {
  const block = await solanaConnection.getParsedBlock(blockNumber, {
    maxSupportedTransactionVersion: 0,
    rewards: false,
  });

  const epochSchedule = await solanaConnection.getEpochSchedule();
  const epoch = epochSchedule.getEpoch(blockNumber);

  if (block === null) {
    logger.info(`Block with hash ${blockNumber} not found`)
    return;
  }

  const {blockhash, blockTime, parentSlot, previousBlockhash, rewards, transactions} = block;
  const processedTransactionsCount = transactions.length;
  const successfulTransactionsCount = transactions.filter(tx => tx.meta && tx.meta.err === null).length;

  const transactionList = transactions
      .slice(0, 5)
      .map(tx => {
        const {meta} = tx;
        return {
          result: meta.err === null ? 'Success' : 'Failed',
          slot: blockNumber,
          signature: tx.transaction.signatures[0],
          fee: meta.fee,
          computeUnitsConsumed: meta.computeUnitsConsumed,
        };
      })
      .sort((a, b) => b.slot - a.slot);

  return {
    type: SEARCH_TYPE.BLOCK,
    blockhash,
    timestamp: blockTime,
    epoch,
    parentSlot,
    parentBlockhash: previousBlockhash,
    processedTransactionsCount,
    successfulTransactionsCount,
    transactions: transactionList,
  }
};

export const getTransaction = async (signature: string): Promise<Transaction> => {
  const transactionDetail = await solanaConnection.getParsedTransaction(signature, {
    maxSupportedTransactionVersion: 0,
  });

  if (transactionDetail === null) {
    logger.info(`Transaction with signature ${signature} not found`)
    return;
  }

  const signatureStatus = await solanaConnection.getSignatureStatus(signature, {searchTransactionHistory: true});
  const {value} = signatureStatus
  const {transaction, slot, blockTime, meta, version} = transactionDetail;
  const {message} = transaction;
  const {instructions, recentBlockhash} = message as { instructions: ParsedInstruction[], recentBlockhash: string };

  return {
    type: SEARCH_TYPE.TRANSACTION,
    signature: transaction.signatures[0],
    result: meta.err === null ? 'Success' : 'Failed',
    timestamp: blockTime,
    confirmationStatus: value.confirmationStatus,
    confirmations: value.confirmations,
    slot,
    recentBlockhash,
    fee: meta.fee,
    computeUnitsConsumed: meta.computeUnitsConsumed,
    version,
    instructions,
    logMessages: meta?.logMessages,
  };
};
