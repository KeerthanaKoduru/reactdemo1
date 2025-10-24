import { createSlice } from "@reduxjs/toolkit";
//import { getCurrentProfileAction } from "../actions/profile.action";
import {
  createProfileAction,
  deleteExperienceAction,
  getCurrentProfileAction,
} from "../actions/profile.action";
import { deleteEducationAction } from "../actions/profile.action";
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
      .addCase(deleteEducationAction.fulfilled, (state, action) => {
        state.profile.education = state.profile.education.filter(
          (edu) => edu._id !== action.meta.arg
        );
      })
      .addCase(deleteExperienceAction.fulfilled, (state, action) => {
        state.profile.experience = state.profile.experience.filter(
          (exp) => exp._id !== action.meta.arg
        );
      })
      .addCase(createProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(createProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentProfileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
        //localStorage.setItem("token", action.payload.data.token);
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
