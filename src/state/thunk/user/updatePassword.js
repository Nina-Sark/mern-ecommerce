import { createAsyncThunk } from "@reduxjs/toolkit";
import USER_API from "../../../api/user/endpoints";

export const updatePassword = createAsyncThunk("userProfile/updatePassword", async ({ newCredentials, token }, thunkAPI) => {
    console.log(token)
    try {
      const data = await USER_API.updatePasswordAPI(newCredentials, token);
      console.log(data)
      return data;
    } catch(err) {
        console.log(err)
    }
})