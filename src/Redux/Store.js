import { configureStore } from "@reduxjs/toolkit";
import TodosReducer from "./Slices/TodoSlice";

export const store = configureStore({
  reducer: {
    Todos: TodosReducer,
  }
});
