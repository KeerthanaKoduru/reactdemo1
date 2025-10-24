import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addEducation,
  addExperience,
  deleteExperience,
  getCurrentProfile,
} from "../../services/profile.service";
import { createProfile } from "../../services/profile.service";
import { deleteEducation } from "../../services/profile.service";

export const deleteExperienceAction = createAsyncThunk(
  "profile/deleteExperienceAction",
  async (expId, { rejectWithValue }) => {
    try {
      const response = await deleteExperience(expId); // API call to delete
      return { data: response.data, status: response.status, expId };
    } catch (err) {
      return rejectWithValue(
        err?.data || { message: "Failed to delete experience" }
      );
    }
  }
);

export const deleteEducationAction = createAsyncThunk(
  "profile/deleteEducationAction",
  async (eduId, { rejectWithValue }) => {
    try {
      const response = await deleteEducation(eduId); // API call to delete
      return { data: response.data, status: response.status, eduId };
    } catch (err) {
      return rejectWithValue(
        err?.data || { message: "Failed to delete education" }
      );
    }
  }
);

export const addEducationAction = createAsyncThunk(
  "profile/education",
  async (formState, { rejectWithValue }) => {
    try {
      const response = await addEducation(formState);
      return { data: response.data, status: response.status };
    } catch (err) {
      return rejectWithValue(err?.data || { message: "Failed" });
    }
  }
);

export const addExperienceAction = createAsyncThunk(
  "profile/experience",
  async (formState, { rejectWithValue }) => {
    try {
      const response = await addExperience(formState);
      return { data: response.data, status: response.status };
    } catch (err) {
      return rejectWithValue(err?.data || { message: "Failed" });
    }
  }
);

export const createProfileAction = createAsyncThunk(
  "profile/createProfileAction",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createProfile(formData);
      return { data: response.data, status: response.status };
    } catch (err) {
      return rejectWithValue(
        err?.data || { message: "Failed to create or update profile" }
      );
    }
  }
);
export const getCurrentProfileAction = createAsyncThunk(
  "profile/getCurrentProfileAction",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentProfile();
      console.log(response);
      if (response.status === 200) {
        return { status: 200, data: response.data };
      }
    } catch (err) {
      const status = err?.status || err?.response?.status;
      if (status === 400)
        return rejectWithValue({ notFound: true, status: 400 });

      return rejectWithValue(
        err?.data || { message: "Failed to load profile" }
      );
    }
  }
);
