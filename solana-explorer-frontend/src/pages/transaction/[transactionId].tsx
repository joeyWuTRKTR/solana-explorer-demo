import TransactionView from "../../views/transaction";
import {getTransactionDetail} from "../../../utils/axios";
import { Custom500 } from "components/ErrorPage";

export async function getServerSideProps({ params }) {
  const transactionDetail = await getTransactionDetail(params.transactionId);
  if (transactionDetail === null) {
    return {
      props: {
        error: true,
      }
    };
  }
  return {
    props: {
      error: false,
      transactionDetail
    },
  };
}

const TransactionId: ({error, transactionDetail}: { error: boolean, transactionDetail: TransactionDetail }) => JSX.Element = ({ error, transactionDetail }) => {
  if (error) {
    return <Custom500 />;
  }

  return (
    <>
      <TransactionView
        transactionDetail={transactionDetail}
      />
    </>
  );
};

export default TransactionId;
