import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth/endpoints";

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, thunkApi) => {
    try {
      const data = await AUTH_API.forgotPasswordAPI(email);
      console.log(data)
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
