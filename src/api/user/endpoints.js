import axios from "axios";
import Cookies from "js-cookie";

const getCurrentUserData = async (fields, token) => {
  try {
    const { data } = await axios.get(
      `/users/me${fields ? `?fields=${fields}` : ""}`,
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
  console.log(newData)
  try {
    const { data } = await axios.patch("/users/me", newData, {
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
    const { data } = await axios.patch("/users/passwordUpdate", newCredentials, {
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