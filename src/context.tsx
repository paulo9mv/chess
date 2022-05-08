import React, { createContext, useContext } from "react";

import { createTodoStore } from "./stores/game";

import { useLocalObservable } from "mobx-react-lite";

const TodoContext = createContext(null);

export const TodoProvider = ({ children }: any) => {
  const todoStore = useLocalObservable(createTodoStore) as any;

  return (
    <TodoContext.Provider value={todoStore}>{children}</TodoContext.Provider>
  );
};
export const useTodoStore = () => useContext<any>(TodoContext);
