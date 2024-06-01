import React, { useReducer } from "react";
import { AuthReducer, initialState } from "./reducer";
import { Action, AuthState } from "../types";

const AuthStateContext = React.createContext<AuthState | null>(null);
const AuthDispatchContext = React.createContext<React.Dispatch<Action> | null>(
  null
);

export function useAuthState(): AuthState {
  const context = React.useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

export function useAuthDispatch(): React.Dispatch<Action> {
  const context = React.useContext(AuthDispatchContext);
  if (!context) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
