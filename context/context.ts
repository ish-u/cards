import { NextPage } from "next";
import React, {
  createContext,
  useReducer,
  ReactNode,
  ReactElement,
} from "react";
import { AppActions, Reducer } from "./reducer";
import { AppState } from "./reducer";

export const InitialState: AppState = {
  active: false,
  id: "",
  device_id: "",
  player: undefined,
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}>({ state: InitialState, dispatch: () => null });

// export const AppProvider = ({ children }: { children: any }): any => {
//   const [state, dispatch] = useReducer(Reducer, InitialState);

//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
