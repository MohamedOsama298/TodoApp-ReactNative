import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {items:[]};
const TodoSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const index = state.items.findIndex(item=>item.id==action.payload.id);
      state.items.splice(index, 1);
    },
    updateTodoItemStatus:(state, action) => {
      const itemIndex = state.items.findIndex(item=>item.id==action.payload.id);
      const item = state.items[itemIndex];  
      if (item.status == "to-do") {
        item.status = "completed";
      } else {
        item.status = "to-do";
      }
    },
  },
  extraReducers: (builder) =>{
    builder
    .addCase(getTodos.fulfilled,(state, action) => {
      state.items=action.payload;
    });
    builder
    .addCase(getTodos.pending,(state, action) => {
    });
    builder
    .addCase(getTodos.rejected,(state, action) => {
    });
  }
});


export const getTodos = createAsyncThunk("Todo/getTodos", (thunkAPI) => {
    return AsyncStorage.getItem("todos").then((res)=>res!= null ? JSON.parse(res) : null)
});
export default TodoSlice.reducer;

export const { addTodo, deleteTodo , updateTodoItemStatus} = TodoSlice.actions;

export const getTodosItems = (state) => state.Todos.items;

