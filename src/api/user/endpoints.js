import axios from "axios";
import Cookies from "js-cookie";

const getCurrentUserData = async (fields, token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/users/me${fields ? `?fields=${fields}` : ""}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error };
  }
};

const updateUserProfile = async (newData, token) => {
  try {
    const { data } = await axios.patch(`${process.env.REACT_APP_URL}/users/me`, newData, {
      headers : {
        authorization : `Bearer ${token}`
      }
    });
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const updatePassword = async (newCredentials, token) => {
  try {
    const { data } = await axios.patch(`${process.env.REACT_APP_URL}/users/passwordUpdate`, newCredentials, {
      headers : {
        authorization : `Bearer ${token}`
      }
    })
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
}

const USER_API = {
  getCurrentUserDataAPI: getCurrentUserData,
  updateUserProfileAPI: updateUserProfile,
  updatePasswordAPI : updatePassword
};

export default USER_API;