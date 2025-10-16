import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/redux/reducers/authSlice";
import profileReducer from "../profiles/redux/reducers/profileSlice";
//step2: create store with reducers
const store = configureStore({
  reducer: { auth: authReducer, profile: profileReducer }, // Add reducers here
  //any key name can be given to the reducer (auth here) authReducer is exported from authSlice.js it's not decided based on name its based on the path we import from
});
export default store;
