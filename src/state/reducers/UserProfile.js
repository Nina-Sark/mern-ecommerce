import { createSlice } from "@reduxjs/toolkit";
import { updatePassword } from "../thunk/user/updatePassword"
import { fetchCurrentUserData } from "../thunk/user/fetchCurrUserData";
import { updateUserProfile } from "../thunk/user/updateUserProfile";

const initialState = {
  user_error: null,
  user_loading: false,
  userData: {
    avatar: null,
    name: null,
  },
  profile_update_loading: false,
  profile_update_error: null,
  update_password_loading: false,
  update_password_error: null,
};

const UserProfile = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    clearProfileError: (state = initialState, action) => {
      return {
        ...state,
        [action.payload?.errorName] : null,
      };
    },
  },
  extraReducers: {
    [fetchCurrentUserData.pending]: (state = initialState, action) => {
      return {
        ...state,
        user_loading: true,
      };
    },
    [fetchCurrentUserData.fulfilled]: (state = initialState, action) => {
      const isError = Object.keys(action.payload)?.includes("error");
      return {
        ...state,
        [isError ? "user_error" : "userData"]: action.payload,
        user_loading: false,
      };
    },
    [updateUserProfile.pending]: (state = initialState, action) => {
      return {
        ...state,
        profile_update_loading: true,
      };
    },
    [updateUserProfile.fulfilled]: (state = initialState, action) => {
      const isError = Object.keys(action.payload)?.includes("error");
      console.log(action.payload);
      return {
        ...state,
        profile_update_loading: false,
        profile_update_error: isError ? action.payload?.error : null,
      };
    },
    [updatePassword.pending]: (state = initialState, action) => {
      return {
        ...state,
        update_password_loading: true,
      };
    },
    [updatePassword.fulfilled]: (state = initialState, action) => {
      const isError = Object.keys(action.payload)?.includes("error");
      return {
        ...state,
        update_password_loading: false,
        update_password_error: isError ? action.payload?.error : null,
      };
    },
  },
});

export const { clearProfileError } = UserProfile.actions;

export default UserProfile.reducer;