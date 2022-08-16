import React, { createContext } from "react";
import { AppActions } from "./reducer";
import { AppState } from "./reducer";

export const InitialState: AppState = {
  active: false,
  id: "",
  device_id: "",
  player: undefined,
  startColor: "#3b4371",
  endColor: "#f3904f",
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
