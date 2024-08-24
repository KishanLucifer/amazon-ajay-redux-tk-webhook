import { createSlice } from '@reduxjs/toolkit';

export const toastMessageSlice = createSlice({
  name: 'toastMessage',
  initialState: {
    displayToastMessage: false,
    message: '', // Add a message field to store the toast message
  },
  reducers: {
    toggleDisplayToast: (state, action) => {
      state.displayToastMessage = !state.displayToastMessage;
      state.message = action.payload; // Set the message from the action payload
    },
  },
});

export const { toggleDisplayToast } = toastMessageSlice.actions;

export const selectToastMessageStatus = (state) => state.toastMessage.displayToastMessage; // Access the correct field

export const selectToastMessage = (state) => state.toastMessage.message; // Selector to access the message

export default toastMessageSlice.reducer;
