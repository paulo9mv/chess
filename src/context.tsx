// Packages
import React, { createContext, useContext } from "react";
import { useLocalObservable } from "mobx-react-lite";

// Store
import { createTodoStore, StoreProps } from "./stores/game";

const AppContext = createContext(null);

export const TodoProvider = ({ children }: any) => {
  const store: any = useLocalObservable(createTodoStore);

  return (
    <AppContext.Provider value={store}>{children}</AppContext.Provider>
  );
};
export const useStore: () => StoreProps = () => useContext<any>(AppContext);
