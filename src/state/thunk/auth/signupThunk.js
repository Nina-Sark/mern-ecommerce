import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth/endpoints";

export const signupThunk = createAsyncThunk(
  "user/signupThunk",
  async (credentials, thunkAPI) => {
      try {
        const data = await AUTH_API.signupUserAPI(credentials);
        console.log("data ===",data);
        return data;
      } catch(err) {
          console.log(err)
      }
  }
);
