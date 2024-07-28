import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import React, { FC, Suspense } from "react";
import { AppBar } from "../components/AppBar";
import { ContentContainer } from "../components/ContentContainer";
import Input from "../components/Input";

require("../styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <title>
          Solana Explorer
        </title>
      </Head>

      <div className="flex flex-col h-screen mx-auto">
        <AppBar />
        <ContentContainer>
          <Link href="/">
            <h1
              className="my-8 text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
                Solana Explorer
            </h1>
          </Link>
          <Input />
          <Component {...pageProps} />
        </ContentContainer>
      </div>
    </>
  );
};

export default App;
