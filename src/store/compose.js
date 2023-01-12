import { createSlice } from "@reduxjs/toolkit";

const initialComposeState = {
    editorState : false,
}
const composeSlice = createSlice({
    name: "compose",
    initialState: initialComposeState,
    reducers: {
        editorIsOpen(state) {
            state.editorState = true;
        },

        editorIsClose(state) {
            state.editorState = false;
        },
    },
});

export const composeActions = composeSlice.actions;
export default composeSlice.reducer;