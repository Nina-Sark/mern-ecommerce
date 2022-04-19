import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthTemplate } from "../components/AuthTemplate";
import { FormInput } from "../components/FormInput";
import { Head } from "../components/Head";
import { Loader } from "../components/Loader";
import profileAnimation from "../lotties/88222-id-card-profile-card.json";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../state/thunk/user/updateUserProfile";
import { LoadingButton } from "../components/LoadingButton";
import { AlertComponent } from "../components/AlertComponent";
import { clearProfileError } from "../state/reducers/UserProfile";
import { useNavigate } from "react-router-dom";

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userData,
    profile_update_loading,
    profile_update_error,
  } = useSelector((state) => state.userProfile);
  const { user_auth } = useSelector((state) => state.user);

  const [newData, setNewData] = useState({
    name: userData?.user?.name,
    email: userData?.user?.email,
    avatar: userData?.user?.avatar?.url,
  });
  const [updated, setUpdated] = useState(false);

  const disabled =
    newData.name === userData?.user?.name &&
    newData.email === userData?.user?.email &&
    newData.avatar === userData?.user?.avatar?.url;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setNewData({ ...newData, avatar: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ newData, token: user_auth?.token }));
    setUpdated(true);
  };
  console.log(profile_update_loading, profile_update_error, updated);
  useEffect(() => {
    if (!profile_update_loading && !profile_update_error && updated) {
      navigate("/profile");
    }
  }, [profile_update_loading]);

  return (
    <>
      {profile_update_error && (
        <AlertComponent
          open={true}
          message={profile_update_error}
          onCloseF={() => dispatch(clearProfileError({errorName : "profile_update_error"}))}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 mt-10 w-full"
      >
        <div className="flex justify-between items-center gap-10">
          <Avatar size="large" src={newData?.avatar} />
          <label
            className="bg-pink-500 text-white text-center cursor-pointer hover:bg-pink-600 py-2 rounded-lg w-full"
            for="avatar_inp"
          >
            Pick avatar
          </label>
          <input
            onChange={handleAvatarChange}
            type="file"
            id="avatar_inp"
            accept=".png, .jpg"
            hidden
          />
        </div>
        <div>
          <FormInput
            {...register("name")}
            error={errors?.name}
            focused
            name="name"
            onChange={(e) =>
              setNewData({ ...newData, [e.target.name]: e.target.value })
            }
            value={newData?.name}
            label="Name"
          />
        </div>
        <div>
          <FormInput
            {...register("email")}
            error={errors?.email}
            focused
            name="email"
            onChange={(e) =>
              setNewData({ ...newData, [e.target.name]: e.target.value })
            }
            value={newData?.email}
            label="Email"
          />
        </div>
        {!profile_update_loading ? (
          <button
            disabled={disabled}
            className={`w-full text-white rounded-sm text-lg h-12 flex space-x-2 items-center justify-center ${
              !disabled
                ? "bg-gradient-to-r from-pink-500 to-blue-400"
                : "bg-gray-500"
            }`}
          >
            Update
          </button>
        ) : (
          <LoadingButton
            text="Update"
            classes="w-full text-white rounded-sm text-lg h-12 bg-gray-500"
          />
        )}
      </form>
    </>
  );
};

export const UpdateProfile = () => {
  const { user_loading } = useSelector((state) => state.userProfile);

  return (
    <>
      {!user_loading ? (
        <>
          <Head title="Update Profile" />
          <AuthTemplate
            animationData={profileAnimation}
            formTitle="update profile"
            form={UpdateProfileForm}
          />
        </>
      ) : (
        <>
          <Head title="Loading..." />
          <Loader />
        </>
      )}
    </>
  );
};
