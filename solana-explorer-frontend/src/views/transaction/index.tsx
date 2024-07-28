import { FC, useEffect, useState } from "react";
import {
  buildInstructionListTable,
  buildLogMessageTable,
  buildTransactionDetailTable,
} from "../../components/builder/tableBuilder";

type Props = {
    transactionDetail: TransactionDetail;
}

const TransactionView: FC<Props> = (props) => {
  const [transactionDetailTable, setTransactionDetailTable] = useState<JSX.Element>(null);
  const [instructionListTable, setInstructionListTable] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const builderTransactionDetailTable = buildTransactionDetailTable(props.transactionDetail);
    setTransactionDetailTable(builderTransactionDetailTable);

    const builderInstructionListTable =
        props.transactionDetail &&
        props.transactionDetail?.instructions &&
        props.transactionDetail.instructions
          .map((instructions, index) => {
            return buildInstructionListTable(instructions);
          });

    setInstructionListTable(builderInstructionListTable);

  }, [props.transactionDetail]);

  return (
    <div className="md:hero mx-auto overflow-x-hidden">
      <div className="md:hero-content flex flex-col">
        {transactionDetailTable}
        {instructionListTable}
        {buildLogMessageTable(props.transactionDetail?.logMessages)}
      </div>
    </div>
  );
};

export default TransactionView;
