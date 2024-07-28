import TransactionList from "components/TransactionList";
import TransactionDetail from "../../components/TransactionDetail";
import {getBlockDetail} from "../../../utils/axios";
import {Custom500} from "../../components/ErrorPage";

export async function getServerSideProps({ params }) {
  const data = await getBlockDetail(params.slot);
  if (data === null) {
    return {
      props: {
        error: true,
      },
    };
  }
  return {
    props: {
      error: false,
      blockInfo: {
        type: data.type,
        blockhash: data.blockhash,
        timestamp: data.timestamp,
        epoch: data.epoch,
        parentSlot: data.parentSlot,
        parentBlockhash: data.parentBlockhash,
        processedTransactionsCount: data.processedTransactionsCount,
        successfulTransactionsCount: data.successfulTransactionsCount,
      },
      transactionList: data.transactions,
    },
  };
}

function BlockView({ error, blockInfo, transactionList }: {  error: boolean, blockInfo: BlockInfo, transactionList: Transaction[] }): JSX.Element;
function BlockView({ error, blockInfo, transactionList }) {
  if (error) {
    return <Custom500 />;
  }
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="flex flex-col">
          <div className="text-center mb-20">
            <TransactionDetail
              blockInfo={blockInfo}
            />
            <TransactionList
              transactionList={transactionList}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlockView;
