import { useEffect, useState } from "react";
import { AuthTemplate } from "../components/AuthTemplate";
import { FormInput } from "../components/FormInput";
import { Head } from "../components/Head";
import passwordAnimation from "../lotties/63004-profile-password-unlock.json";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "../components/LoadingButton"
import { AlertComponent } from "../components/AlertComponent";
import { clearProfileError } from "../state/reducers/UserProfile";
import { updatePassword } from "../state/thunk/user/updatePassword";
import { useNavigate } from "react-router-dom";

const PasswordChangeForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updated, setUpdated] = useState(false)

  const disabled = !oldPassword || !newPassword;
  const { update_password_loading, update_password_error } = useSelector(
    (state) => state.userProfile
  );
  const { user_auth } = useSelector((state) => state.user)

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(updatePassword({ newCredentials : { oldPassword, newPassword }, token : user_auth?.token }))
    setUpdated(true)
  };

  useEffect(() => {
    if (!update_password_loading && !update_password_error && updated) {
      navigate("/profile");
    }
  }, [update_password_loading]);


  return (
      <>
      {update_password_error && (
        <AlertComponent
          open={true}
          message={update_password_error}
          onCloseF={() => dispatch(clearProfileError({errorName : "update_password_error"}))}
        />
      )}
    <form onSubmit={onSubmit} className="flex flex-col space-y-6 mt-10 w-full">
      <FormInput
        name="oldPassword"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        label="Old password"
      />
      <FormInput
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        label="New password"
      />
      {!update_password_loading ? (
        <button
          disabled={disabled}
          className={`w-full text-white rounded-sm text-lg h-12 flex space-x-2 items-center justify-center ${
            !disabled
              ? "bg-gradient-to-r from-pink-500 to-blue-400"
              : "bg-gray-500"
          }`}
        >
          Update Password
        </button>
      ) : (
        <LoadingButton
          text="Update Password"
          classes="w-full text-white rounded-sm text-lg h-12 bg-gray-500"
        />
      )}
    </form>
    </>
  );
};

export const PasswordChange = () => {
  return (
    <>
      <Head title="Change Password" />
      <AuthTemplate
        animationData={passwordAnimation}
        formTitle="change password"
        form={PasswordChangeForm}
      />
    </>
  );
};
