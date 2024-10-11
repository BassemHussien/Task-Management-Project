import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./components/Redux/Admin/adminReducer";
// import userReducer from './components/Redux/User/userReducer';
// import userReducer from './components/Redux/User/userSlice';
const store = configureStore({
    reducer: {
        admin: adminReducer,
        // user: userReducer
    }
})

export default store;