import { createSlice } from "@reduxjs/toolkit";
//import { getCurrentProfileAction } from "../actions/profile.action";
import { getCurrentProfileAction } from "../actions/profile.action";
const initialState = {
  profile: null, //holds current user's profile
  profiles: [], //holds all profiles
  loading: true,
  error: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState, //this will be both key and value
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(getCurrentProfileAction.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.payload;
        state.profile = null;
      });
  },
});

export default profileSlice.reducer;
