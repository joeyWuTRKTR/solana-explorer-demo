import { FC, useEffect, useState } from "react";
import { buildBlockOverviewTable } from "./builder/tableBuilder";

type Props = {
    blockInfo: BlockInfo;
}

const TransactionDetail: FC<Props> = (props) => {
  const [overviewTable, setOverviewTable] = useState<JSX.Element>(null);

  useEffect(() => {
    const builderOverviewTable = buildBlockOverviewTable(props.blockInfo);
    setOverviewTable(builderOverviewTable);
  }, [props.blockInfo]);

  return (
    <>
      {overviewTable}
    </>);
};

export default TransactionDetail;
