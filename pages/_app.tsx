import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext, InitialState } from "../context/context";
import { Reducer } from "../context/reducer";
import { useReducer } from "react";
import Player from "../components/Player";
import GradientPicker from "../components/GradientPicker";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(Reducer, InitialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <GradientPicker />
      <Component {...pageProps} />
      {/* <Player /> */}
    </AppContext.Provider>
  );
}

export default MyApp;
