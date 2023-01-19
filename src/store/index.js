import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import inboxReducer from "./inboxSlice";
import showReducer from "./showSlice";


const store = configureStore({
  reducer: {
    auth : authReducer,
    inbox : inboxReducer,
    show : showReducer,
  },
});

export default store;