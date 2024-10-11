// import { createSlice } from "@reduxjs/toolkit";
// import auth from "../../Firebase/firebase";
// // import { onAuthStateChanged } from "firebase/auth";
// const initialState = {
//   adminState: false,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.adminState = action.payload;
//     },
//     logout: (state) => {
//       state.adminState = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export const selectadminState = (state) => state.auth.adminState;
// export default authSlice.reducer;