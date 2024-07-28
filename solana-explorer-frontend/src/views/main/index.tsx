import React, { FC, useEffect, useState } from "react";
import {buildRecentBlockTable} from "../../components/builder/tableBuilder";

type Props = {
  recentBlockList: BasicBlockInfo[];
};

const Main:FC<Props> = (props) => {
  const { recentBlockList } = props;
  const [recentBlockTable, setRecentBlockTable] = useState<JSX.Element>(null);

  useEffect(() => {
    const builderBlockTable = buildRecentBlockTable(recentBlockList);
    setRecentBlockTable(builderBlockTable);
  }, [recentBlockList]);

  return (
    <>
      {recentBlockTable}
    </>
  );
};

export default Main;
