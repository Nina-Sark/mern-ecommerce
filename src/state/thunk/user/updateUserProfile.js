import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import USER_API from "../../../api/user/endpoints";

export const updateUserProfile = createAsyncThunk("userProfile/updateUserProfile", async ({ newData, token }, thunkAPI) => {
    console.log(token)
    try {
      const data = await USER_API.updateUserProfileAPI(newData, token);
      console.log(data)
      return data;
    } catch(err) {
        console.log(err)
    }
})