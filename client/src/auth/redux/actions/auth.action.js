/* //file4
import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "../../services/auth.service";
import { loginUser, loadUser } from "../../services/auth.service";
import { useDispatch } from "react-redux";
export const loadUserAction = createAsyncThunk(
  "auth/loadUserAction",
  async (_, { rejectWithValue }) => {
    //_ is used as load data does not require any data from component
    try {
      const data = await loadUser();
      return data;
    } catch (error) {}
  }
);

export const loginUserAction = createAsyncThunk(
  "auth/loginUserAction",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await loginUser(userData);
      dispatch(loadUserAction());
      return data;
    } catch (error) {}
  }
);

export const registerUserAction = createAsyncThunk(
  //this action with whom it will be associated
  //to create action we use this function createAsyncThunk
  "auth/registerUserAction", //connect and utilize with the reducer auth action name here const
  async (userData, { rejectWithValue, dispatch }) => {
    //userdata all 1st args are from components
    //1st initial args are the arguments which u will pass while calling the action
    //2nd arg is an object which has multiple properties
    //this is coming from redux toolkit
    //rejectWithValue: to handle errors
    //dispatch:to dispatch other actions
    try {
      const data = await registerUser(userData);
      dispatch(loadUserAction());
      return data; //payload internally
    } catch (error) {}
  }
); //handle middleware
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadUser, loginUser, registerUser } from "../../services/auth.service";

export const loadUserAction = createAsyncThunk(
  "auth/loadUserAction",
  async (_, { rejectWithValue }) => {
    try {
      const data = await loadUser();
      return { data }; // payload internally.
    } catch (error) {}
  }
);
export const loginUserAction = createAsyncThunk(
  "auth/loginUserAction",
  async (userData, { rejectWithValue, dispatch }) => {
    //1st initial args are the arguments which u will pass while calling the action
    //2nd arg is an object which has multiple properties
    // this is coming from redux toolkit
    // rejectWithValue: to handle the errors
    // dispatch: to dispatch other actions
    try {
      const data = await loginUser(userData);

      dispatch(loadUserAction()); // to load the user details after login
      return data; // payload internally.
    } catch (error) {}
  }
);

export const registerUserAction = createAsyncThunk(
  // this action with whome it will be associated
  "auth/registerUserAction",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await registerUser(userData);
      dispatch(loadUserAction());
      return data; // payload internally.
    } catch (error) {}
  }
);
