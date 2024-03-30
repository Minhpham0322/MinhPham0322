import React, { createContext, useReducer } from "react";
import { initialSate, rootReducer } from "./rootReducer";

export const ProviderContext = createContext();

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialSate);
  return (
    <ProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </ProviderContext.Provider>
  );
}
