import { createSlice } from '@reduxjs/toolkit';

const initialState = { mailData: [], firstTime: true, unreadMessageCount: 0 };

const inboxSlice = createSlice({
  name: 'mail',
  initialState: initialState,
  reducers: {
    firstTime(state, action) {
      state.firstTime = action.payload;
    },
    add(state, action) {
      state.mailData = [action.payload, ...state.mailData];
    },
    remove(state, action) {
      state.mailData = state.mailData.filter(mail => mail.id !== action.payload.id);
    },
    replace(state, action) {
      state.mailData = action.payload.mailData;
      state.firstTime = false;
      state.unreadMessageCount = action.payload.unreadMessageCount;
    },
  },
});

export const inboxActions = inboxSlice.actions;
export default inboxSlice.reducer;