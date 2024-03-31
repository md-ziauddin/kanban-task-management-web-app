import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./boardSlice";
boardSlice;

const store = configureStore({
  reducer: {
    boards: boardSlice.reducer,
  },
});

export default store;
