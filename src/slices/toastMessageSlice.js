// import { createSlice } from "@reduxjs/toolkit";

// export const toastMessageSlice = createSlice({
//   name: "toastMessage",
//   initialState: {
//     displayToastMessage: false,
//     message: "", // Add a message field to store the toast message
//   },
//   reducers: {
//     toggleDisplayToast: (state, action) => {
//       state.displayToastMessage = !state.displayToastMessage;
//       state.message = action.payload; // Set the message from the action payload
//     },
//   },
// });

// export const { toggleDisplayToast } = toastMessageSlice.actions;

// export const selectToastMessageStatus = (state) =>
//   state.toastMessage.displayToastMessage; // Access the correct field

// export const selectToastMessage = (state) => state.toastMessage.message; // Selector to access the message

// export default toastMessageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// export const toastMessageSlice = createSlice({
//   name: "toastMessage",
//   initialState: {
//     displayToastMessage: false,
//     message: "", // Field to store the toast message
//   },
//   reducers: {
//     // Action to set the toast message and display it
//     setToastMessage: (state, action) => {
//       state.displayToastMessage = !state.displayToastMessage;
//       state.message = action.payload; // Set the message from the action payload
//       state.displayToastMessage = true; // Show the toast
//     },
//     // Action to hide the toast
//     hideToast: (state) => {
//       state.displayToastMessage = false; // Hide the toast
//     },
//   },
// });

// export const { setToastMessage, hideToast } = toastMessageSlice.actions;

// export const selectToastMessageStatus = (state) =>
//   state.toastMessage.displayToastMessage; // Selector for display status

// export const selectToastMessage = (state) => state.toastMessage.message; // Selector for the message

// export default toastMessageSlice.reducer;
