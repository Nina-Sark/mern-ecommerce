import axios from "axios";
import Cookies from "js-cookie";

const headersOptions = {
  headers: {
    authorization: `Bearer ${
      Cookies.get("auth") ? JSON.parse(Cookies.get("auth"))?.token : ""
    }`,
  },
};

const loginUser = async (credentials) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    console.log("data ==", data);
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error };
  }
};

const signupUser = async (credentials) => {
  try {
    const { data } = await axios.post("/auth/register", credentials);
    console.log("---", data);
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error };
  }
};

const logoutUser = async () => {
  try {
    const { data } = await axios.post("/auth/logout", null, headersOptions);
    console.log("log out --- ", data);
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error };
  }
};

const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post("/auth/forgotPassword", { email });
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const resetPassword = async (token, password) => {
  console.log(token, password);
  try {
    const { data } = await axios.patch(`/auth/resetPassword/${token}`, {
      password,
    });
    console.log(data);
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const AUTH_API = {
  loginUserAPI: loginUser,
  signupUserAPI: signupUser,
  logoutUserAPI: logoutUser,
  forgotPasswordAPI: forgotPassword,
  resetPasswordAPI: resetPassword,
};

export default AUTH_API;