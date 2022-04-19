import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth/endpoints";

export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async (credentials, thunkAPI) => {
      try {
        const data = await AUTH_API.loginUserAPI(credentials);
        console.log("data ===",data);
        return data;
      } catch(err) {
          console.log(err)
      }
  }
);
