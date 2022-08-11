import type { NextPage } from "next";
import Head from "next/head";
import API from "../components/API";
import Search from "../components/Search";
const Home: NextPage = () => {
  return (
    <div className="px-12">
      <Head>
        <title>cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Search />
      <API />
    </div>
  );
};

export default Home;
