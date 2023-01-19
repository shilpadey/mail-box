import { createSlice } from "@reduxjs/toolkit";

const initialState = {isLoggedIn: localStorage.getItem('idToken') ? true : false}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('idToken')
    },
  }
})

export const authActions = authSlice.actions;
export default authSlice.reducer; 