import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import USER_API from "../../../api/user/endpoints";

export const fetchCurrentUserData = createAsyncThunk("userProfile/fetchCurrentUserData", async (fields = "", thunkAPI) => {
    try {
      console.log(JSON.parse(Cookies.get("auth"))?.token)
      const data = await USER_API.getCurrentUserDataAPI(fields, JSON.parse(Cookies.get("auth"))?.token);
      console.log(data)
      return data;
    } catch(err) {
        console.log(err)
    }
})