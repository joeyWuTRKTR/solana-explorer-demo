import { FC, useEffect, useState } from "react";
import { buildTransactionListTable } from "./builder/tableBuilder";

interface TransactionLogProps {
 transactionList: Transaction[];
}

const TransactionList: FC<TransactionLogProps> = (props) => {
  const [transactionTable, setTransactionTable] = useState<JSX.Element>(null);

  useEffect(() => {
    const builderTransactionListTable = buildTransactionListTable(props.transactionList);
    setTransactionTable(builderTransactionListTable);
  }, [props.transactionList]);

  return (
    <>
      {transactionTable}
    </>
  );
};

export default TransactionList;
