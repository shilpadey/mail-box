import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import composeReducer from "./compose";


const store = configureStore({
  reducer: {
    auth : authReducer,
    compose : composeReducer,
  },
});

export default store;