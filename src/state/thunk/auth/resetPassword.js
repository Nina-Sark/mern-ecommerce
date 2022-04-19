const { createAsyncThunk } = require("@reduxjs/toolkit");
const { default: AUTH_API } = require("../../../api/auth/endpoints");

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }, thunkAPI) => {
    try {
      const data = await AUTH_API.resetPasswordAPI(token, password);
      console.log(data)
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);