import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunk/auth/loginThunk";
import { logoutThunk } from "../thunk/auth/logoutThunk";
import { signupThunk } from "../thunk/auth/signupThunk";
import Cookies from "js-cookie";
import { forgotPassword } from "../thunk/auth/forgotPassword";
import { resetPassword } from "../thunk/auth/resetPassword";

const initialState = {
  user_auth: Cookies.get("auth") ? JSON.parse(Cookies.get("auth")) : null,
  auth_login_loading: false,
  auth_login_error: null,
  auth_signup_loading: false,
  auth_signup_error: null,
  auth_logout_error: null,
  auth_logout_loading: false,
  forgot_password_loading: false,
  forgot_password_error: null,
  forgot_password_success: false,
  reset_password_loading: false,
  reset_password_error: null,
  reset_password_success : false
};

const UserReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state = initialState, action) => {
      const { error_name } = action.payload;
      return {
        ...state,
        [error_name]: null,
      };
    },
  },
  extraReducers: {
    [loginThunk.fulfilled]: (state = initialState, action) => {
      const isError = Object.keys(action.payload)?.includes("error");
      if (!isError)
        Cookies.set("auth", JSON.stringify(action.payload), { expires: 7 });
      return {
        ...state,
        [isError ? "auth_login_error" : "user_auth"]: action.payload,
        auth_login_error: isError ? action.payload : null,
        auth_login_loading: false,
      };
    },
    [loginThunk.pending]: (state = initialState, action) => {
      return {
        ...state,
        auth_login_loading: true,
      };
    },
    [signupThunk.fulfilled]: (state = initialState, action) => {
      const isError = Object.keys(action.payload)?.includes("error");
      if (!isError)
        Cookies.set("auth", JSON.stringify(action.payload), { expires: 7 });
      return {
        ...state,
        [isError ? "auth_signup_error" : "user_auth"]: action.payload,
        auth_signup_error: isError ? action.payload : null,
        auth_signup_loading: false,
      };
    },
    [signupThunk.pending]: (state = initialState, action) => {
      return {
        ...state,
        auth_signup_loading: true,
      };
    },
    [logoutThunk.fulfilled]: (state = initialState, action) => {
      const isError = Object.keys(action.payload)?.includes("error");
      return {
        ...state,
        [isError ? "auth_logout_error" : "user_auth"]: isError
          ? action.payload
          : null,
        user_auth: null,
        auth_logout_error: isError ? action.payload : null,
        auth_logout_loading: false,
      };
    },
    [logoutThunk.pending]: (state = initialState, action) => {
      return {
        ...state,
        auth_logout_loading: true,
      };
    },
    [forgotPassword.pending]: (state = initialState, action) => {
      return {
        ...state,
        forgot_password_error: null,
        forgot_password_loading: true,
      };
    },
    [forgotPassword.fulfilled]: (state = initialState, action) => {
      const isError = Object.keys(action.payload)?.includes("error");

      return {
        ...state,
        forgot_password_loading: false,
        forgot_password_error: isError ? action.payload?.error : null,
        forgot_password_success: !isError ? true : false,
      };
    },
    [resetPassword.pending] : (state = initialState, action) => {
      return {
        ...state,
        reset_password_loading : true
      }
    },
    [resetPassword.fulfilled] : (state = initialState, action) => {
      const isError = Object.keys(action.payload)?.includes("error");
      return {
        ...state,
        reset_password_loading : false,
        reset_password_error : isError ? action.payload : null,
        reset_password_success : !isError ? true : false
      }
    }
  },
});

export const { clearError } = UserReducer.actions;

export default UserReducer.reducer;
