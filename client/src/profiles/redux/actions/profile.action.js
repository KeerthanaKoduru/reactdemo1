// getCurrentProfileAciton
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentProfile } from "../../services/profile.service";

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
