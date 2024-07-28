type BlockInfo = {
    type: string;
    blockhash: string;
    slot: number;
    timestamp: number;
    epoch: number;
    parentSlot: number;
    parentBlockhash: string;
    processedTransactionsCount: number;
    successfulTransactionsCount: number;
}

type Transaction = {
    result: string;
    slot: number;
    signature: string;
    fee: number;
    computeUnitsConsumed: number;
}

type Instruction = {
  "accounts": string[],
  "data": string,
  "programId": string,
}

type TransactionDetail = {
    type: string;
    signature: string;
    result: string;
    timestamp: number;
    confirmationStatus: string;
    confirmations: number | null;
    slot: number;
    recentBlockhash: string;
    fee: number;
    computeUnitsConsumed: number;
    version: string;
    instructions?: Instruction[] | null;
    logMessages?: string[] | null;
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
