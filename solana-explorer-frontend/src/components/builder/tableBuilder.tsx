import {
  timestampInSecondsToUserTimezone,
  timestampInSecondToDatetime,
  timestampToNowInHourAndMinute,
} from "../../../utils/time";
import { shortenStringWithDot } from "../../../utils/string";
import Link from "next/link";
import { base58ToHex, splitHexEveryTwoDigitsWithSpace } from "../../../utils/transform";
import {groupLogMessages} from "../../../utils/message";

export const buildRecentBlockTable = (recentBlockList: BasicBlockInfo[]) => {
  if (recentBlockList && recentBlockList.length !== 0) {
    const header = (
      <thead className="text-s text-gray-700 uppercase bg-zinc-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-3 py-3">Slot</th>
          <th className="px-3 py-3">Blockhash</th>
          <th className="px-3 py-3">Transactions</th>
          <th className="px-3 py-3">Rewards</th>
          <th className="px-3 py-3">Time</th>
        </tr>
      </thead>
    );

    const rows = recentBlockList.map((block, i) => {
      const { blockNumber, blockhash, timestamp, processedTransactionsCount, rewards } = block;
      const datetimeUtilNow = timestampToNowInHourAndMinute(timestamp);

      return (
        <tr key={i + 1} className="text-center bg-white border-b bg-zinc-800 dark:border-zinc-700">
          <td className="px-3 py-3">
            <Link
              className={"inline-flex rounded-full px-3 py-1.5 text-sky-400 hover:text-indigo-500 [&.active]:bg-indigo-100 [&.active]:text-indigo-600 active}"}
              href={{
                pathname: "/block/[slot]",
                query: { slot: blockNumber }
              }}
            >
              {blockNumber}
            </Link>
          </td>
          <td className="px-3 py-3">
            {shortenStringWithDot(blockhash, 16)}
          </td>
          <td className="px-3 py-3">{processedTransactionsCount}</td>
          <td className="px-3 py-3">
            <div className="w-80 mx-auto break-words">
              {`${rewards[0].pubkey}`}
            </div>
            <div>
              {`${rewards[0].lamports / 100000000} $SOL`}
            </div>
          </td>
          <td className="px-3 py-3">{datetimeUtilNow}</td>
        </tr>);
    });
    return (
      <table className="my-8 w-full mx-auto text-m center text-gray-500 dark:text-gray-400">
        {header}
        <tbody>{rows}</tbody>
      </table>
    );
  }

  return null;
};

export const buildBlockOverviewTable = (blockInfo: BlockInfo) => {
  if (blockInfo) {
    const utcDate = timestampInSecondToDatetime(blockInfo.timestamp);
    const userDate = timestampInSecondsToUserTimezone(blockInfo.timestamp);

    const table =
      (
        <div className="w-full mx-auto">
          <h1
            className="my-4 text-left text-3xl font-bold bg-clip-text">
            {blockInfo.type}
          </h1>
          <table className="w-full text-m text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
                <td className="pl-6 py-3">Blockhash</td>
                <td className="pl-6 py-3">{blockInfo.blockhash}</td>
              </tr>
              <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
                <td className="pl-6 py-3">Slot</td>
                <td className="pl-6 py-3">{blockInfo.slot}</td>
              </tr>
              <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
                <td className="pl-6 py-3">Timestamp (Local)</td>
                <td className="pl-6 py-3">{userDate}</td>
              </tr>
              <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
                <td className="pl-6 py-3">Timestamp (UTC)</td>
                <td className="pl-6 py-3">{utcDate}</td>
              </tr>
              <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
                <td className="pl-6 py-3">Epoch</td>
                <td className="pl-6 py-3">{blockInfo.epoch}</td>
              </tr>
              <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
                <td className="pl-6 py-3">Parent Blockhash</td>
                <td className="pl-6 py-3">{blockInfo.parentBlockhash}</td>
              </tr>
              <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
                <td className="pl-6 py-3">Parent Slot</td>
                <td className="pl-6 py-3">{blockInfo.parentSlot}</td>
              </tr>
              <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
                <td className="pl-6 py-3">Processed Transactions Number</td>
                <td className="pl-6 py-3">{blockInfo.processedTransactionsCount}</td>
              </tr>
              <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
                <td className="pl-6 py-3">Successful Transactions Number</td>
                <td className="pl-6 py-3">{blockInfo.successfulTransactionsCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    return table;
  }

  return null;
};

export const buildTransactionListTable = (transactionList: Transaction[]) => {
  if(transactionList && transactionList.length > 0) {
    const header = (
      <thead className="text-s text-gray-700 uppercase bg-zinc-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="w-1/8 py-3">Result</th>
          <th className="w-5/8">Transaction Signature</th>
          <th className="w-1/8">Fee (SOL)</th>
          <th className="w-1/8">Compute</th>
        </tr>
      </thead>
    );
    const rows = transactionList.map((transaction, i) => {
      const { result, signature, fee, computeUnitsConsumed } = transaction;
      const resultColor = result === "Success" ? "text-green-500" : "text-red-500";

      return (
        <tr key={i + 1} className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
          <td className={`w-1/8 py-3 ${resultColor}`}>{result}</td>
          <td className="w-5/8">
            <Link
              className={"inline-flex rounded-full px-3 py-1.5 text-sky-400 hover:text-indigo-500 [&.active]:bg-indigo-100 [&.active]:text-indigo-600 active}"}
              href={{
                pathname: "/transaction/[signature]",
                query: { signature: signature }
              }}
            >
              {shortenStringWithDot(signature, 16)}
            </Link>
          </td>
          <td className="w-1/8">{fee}</td>
          <td className="w-1/8">{computeUnitsConsumed}</td>
        </tr>);
    });
    return (
      <div className="w-full mx-auto">
        <h1
          className="mt-12 mb-4 text-left text-3xl font-bold bg-clip-text">
          Transaction List
        </h1>
        <table className="w-full text-m center text-gray-500 dark:text-gray-400">
          {header}
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
  return null;
};

export const buildTransactionDetailTable = (transactionDetail: TransactionDetail) => {
  if (transactionDetail) {
    const utcDate = timestampInSecondToDatetime(transactionDetail.timestamp);
    const userDate = timestampInSecondsToUserTimezone(transactionDetail.timestamp);

    return (
      <div className="mb-10 w-full">
        <h1
          className="my-4 text-left text-3xl font-bold bg-clip-text">
          {transactionDetail.type}
        </h1>
        <table className="w-full text-m text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Signature</td>
              <td className="p-6 py-3 text-sky-400">
                <div className="w-2/3 break-words">
                  {transactionDetail.signature}
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Result</td>
              <td className="p-6 py-3">{transactionDetail.result}</td>
            </tr>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Timestamp (Local)</td>
              <td className="p-6 py-3">{userDate}</td>
            </tr>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Timestamp (UTC)</td>
              <td className="p-6 py-3">{utcDate}</td>
            </tr>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Confirmation Status</td>
              <td className="p-6 py-3">{transactionDetail.confirmationStatus.toUpperCase()}</td>
            </tr>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Confirmations</td>
              <td
                className="p-6 py-3">{transactionDetail.confirmations === null ? "MAX" : transactionDetail.confirmations}</td>
            </tr>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Slot</td>
              <td className="p-6 py-3">{transactionDetail.slot}</td>
            </tr>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Recent Blockhash</td>
              <td className="p-6 py-3">{transactionDetail.recentBlockhash}</td>
            </tr>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Fee (SOL)</td>
              <td className="p-6 py-3">{transactionDetail.fee}</td>
            </tr>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Compute units consumed</td>
              <td className="p-6 py-3">{transactionDetail.computeUnitsConsumed}</td>
            </tr>
            <tr className="bg-white border-b bg-zinc-800 dark:border-zinc-700">
              <td className="p-6 py-3">Transaction Version</td>
              <td className="p-6 py-3">{transactionDetail.version}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return null;

};

export const buildInstructionListTable = (instruction: Instruction) => {
  if (instruction) {
    const header = (
      <thead className="text-s text-gray-700 uppercase bg-zinc-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="w-1/4 px-3 py-3">Account</th>
          <th className="w-3/4 px-3 py-3">Address</th>
        </tr>
      </thead>
    );
    const rows = instruction.accounts && instruction.accounts.map((account, i) => {
      return (
        <tr key={i + 1} className="text-center bg-white border-b bg-zinc-800 dark:border-zinc-700">
          <td className="w-1/4 px-3 py-3">{`Account ${i + 1}`}</td>
          <td className="w-3/4 px-3 py-3">{account}</td>
        </tr>
      );
    });

    const hexData = base58ToHex(instruction.data);
    const hexString = splitHexEveryTwoDigitsWithSpace(hexData);

    return (
      <div className="w-full mx-auto mb-10">
        <div
          className="mb-4 text-left text-3xl bg-clip-text">
          Instruction List
        </div>
        <div
          className="mb-2 text-left text-l bg-clip-text">
          {`programId: ${instruction?.programId}`}
        </div>
        <div
          className="mb-2 text-left text-l bg-clip-text">
          {`Instruction Data (Hex): ${hexString}`}
        </div>
        {instruction.accounts && instruction.accounts.length > 0 && (
          <table className="w-full text-m center text-gray-500 dark:text-gray-400">
            {header}
            <tbody>{rows}</tbody>
          </table>
        )}
      </div>
    );
  }

  return null;
};

export const buildLogMessageTable = (logMessages: string[]) => {
  if (logMessages && logMessages.length > 0) {
    const groupedMessages = groupLogMessages(logMessages);

    return (
      <div className="w-full mx-auto mb-10">
        <div
          className="mb-4 text-left text-3xl bg-clip-text">
          Log List
        </div>
        {groupedMessages.map((group, index) => (
          <div key={index} className="mb-4">
            <div className="font-bold text-xl my-2">Log# {index + 1}</div>
            {group.map((message, msgIndex) => (
              <div key={msgIndex} className="ml-4 w-2/3 break-words">
                {message}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return null;
};
