import { createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_API from "../../../api/auth/endpoints";
import Cookies from "js-cookie"

export const logoutThunk = createAsyncThunk(
  "user/logoutThunk",
  async (_, thunkAPI) => {
      try {
        const data = await AUTH_API.logoutUserAPI();
        Cookies.remove("auth")
        console.log("data ===",data);
        return data;
      } catch(err) {
          console.log(err)
      }
  }
);
