import Head from "next/head";
import Main from "../views/main";
import {getRecentBlockList} from "../../utils/axios";
import { Custom500 } from "components/ErrorPage";

export const getServerSideProps = async() => {
  const data = await getRecentBlockList();
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
      recentBlockList: data,
    },
  };
};

const Home: ({error, recentBlockList}: { error: boolean, recentBlockList: BasicBlockInfo[] }) => JSX.Element = ({ error, recentBlockList }) => {
  if (error) {
    return <Custom500 />;
  }

  return (
    <div>
      <Head>
        <title>Solana Explorer</title>
      </Head>
      <div className="md:hero mx-auto overflow-x-hidden">
        <div className="md:hero-content flex flex-col">
          <Main
            recentBlockList={recentBlockList}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
