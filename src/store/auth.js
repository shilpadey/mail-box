import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: false,
    token: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state,action) {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
        logout(state,action) {
            state.isAuthenticated = false;
            state.token = null;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;