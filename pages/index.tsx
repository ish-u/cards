import Head from "next/head";
import { useContext, useEffect } from "react";
import API from "../components/API";
import Search from "../components/Search";
import { AppContext } from "../context/context";
import { ActionType } from "../context/reducer";

const Home = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    // dispatch({
    //   type: ActionType.Toggle,
    //   payload: {
    //     active: false,
    //   },
    // });
    dispatch({
      type: ActionType.Change,
      payload: {
        id: "",
      },
    });
  }, []);

  return (
    <div className="h-screen md:px-12 sm:px-0">
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
