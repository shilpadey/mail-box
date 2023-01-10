import { createSlice } from "@reduxjs/toolkit";

const initialIdToken = localStorage.getItem('idToken')

const initialAuthState = {
    isAuthenticated: false,
    token: initialIdToken,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state,action) {
            state.isAuthenticated = true;
            state.token = action.payload.idToken;
            localStorage.setItem('idToken', action.payload.idToken);
        },
        logout(state,action) {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('idToken');
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;