import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthTemplate } from "../components/AuthTemplate";
import { FormInput } from "../components/FormInput";
import resetPassAnimation from "../lotties/76040-change-passwords.json";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { LoadingButton } from "../components/LoadingButton"
import { AlertComponent } from "../components/AlertComponent"
import { resetPassword } from "../state/thunk/auth/resetPassword"


const ResetPasswordForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token } = useParams()
  const [newPassword, setNewPassword] = useState("");

  const { reset_password_loading, reset_password_error, reset_password_success } = useSelector((state) => state.user)

  const disabled = !newPassword;

  const onSubmit = event => {
      event.preventDefault()
      console.log(token)
      dispatch(resetPassword({ token, password : newPassword }))
  }

  useEffect(() => {
     if(!reset_password_loading && !reset_password_error && reset_password_success) {
         navigate("/login")
     }
  }, [reset_password_loading])

  return (
   <>
   {reset_password_error && (
       <AlertComponent
       open={true}
       status="error"
       errorName="reset_password_error"
       message={reset_password_error?.error}/>
   )}
    <form onSubmit={onSubmit} className="flex flex-col space-y-6 mt-10">
      <FormInput
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        label="New password"
        type="password"
      />
     {!reset_password_loading ? (
          <button
          disabled={disabled}
          className={`w-full text-white rounded-sm text-lg h-12 flex space-x-2 items-center justify-center ${
            !disabled
              ? "bg-gradient-to-r from-pink-500 to-blue-400"
              : "bg-gray-500"
          }`}
        >
          Reset Password
        </button>
     ) : (
        <LoadingButton
        classes="w-full text-white rounded-sm text-lg h-12 bg-gray-500"
        text="Reset Password"
      />
     )}
    </form>
   </>
  );
};

export const ResetPassword = () => {
  return (
    <AuthTemplate
      form={ResetPasswordForm}
      animationData={resetPassAnimation}
      formTitle="Reset Password"
    />
  );
};
