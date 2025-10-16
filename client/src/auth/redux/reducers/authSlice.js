/* //file5
//reducer is used to make the changes into the store
//handles data manipulation logic
import { createSlice } from "@reduxjs/toolkit";
import { registerUserAction } from "../actions/auth.action";
import { loginUserAction, loadUserAction } from "../actions/auth.action";
//step3: it's empty first
const authState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  token: localStorage.getItem("token"), //add this to perform interaction with the backend
};
//step4: first empty slice with json object only inside {}
const authSlice = createSlice({
  name: "auth", // can be of any name other than in store.js
  initialState: authState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.pending, (state) => {
        state.loading = true; //state is authstate/initialstate
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.data.token; //add user details to the state
        //add the token => by passing 2nd arg nxt to state as action
        //action is return from registerUserAction in the addCase arg done implicitly
        //payload is used to share the data between action(from service) and reducer
      })
      .addCase(registerUserAction.rejected)
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.data.token;
      })
      .addCase(loginUserAction.rejected)
      .addCase(loadUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.data; //user details
      })
      .addCase(loadUserAction.rejected);
  }, //all rest calls related logic will be here
  reducers: {}, //common business logic related to auth no rest calls
  //we used in this file as this file defines reducers
});
export default authSlice.reducer;
 */

import { createSlice } from "@reduxjs/toolkit";
import {
  loadUserAction,
  loginUserAction,
  registerUserAction,
} from "../actions/auth.action";

const authState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
};
// isAuthenticated: to check if the user is logged in or not
// user: to store user information
// loading: to indicate if an authentication-related operation is in progress
// error: to store any error messages related to authentication

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.pending, (state) => {
        // state: authState / initailstate
        state.loading = true;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload?.data?.token;
        //state.user = action.payload.data; // user details
        console.log(action.payload.data.token);
        localStorage.setItem("token", action.payload.data.token);
        // action : return ==> registerUserAction`
        // add the token ==> who will bring the token?
        //
      })
      .addCase(registerUserAction.rejected)
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(loginUserAction.rejected)
      .addCase(loadUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        console.log(action.payload.data);
        state.user = action.payload.data; // user details
      })
      .addCase(loadUserAction.rejected);
  }, // all rest calls.
  reducers: {}, //common business logic related to auth no rest calls
});

export default authSlice.reducer;
