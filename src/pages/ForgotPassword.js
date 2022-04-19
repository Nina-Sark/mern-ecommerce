import { Head } from "../components/Head";
import { AuthTemplate } from "../components/AuthTemplate";
import forgotPasswordAnimation from "../lotties/94132-forgot-password.json";
import { FormInput } from "../components/FormInput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../state/thunk/auth/forgotPassword";
import { AlertComponent } from "../components/AlertComponent";
import { LoadingButton } from "../components/LoadingButton";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();

  const {
    forgot_password_loading,
    forgot_password_error,
    forgot_password_success,
  } = useSelector((state) => state.user);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email is not valid")
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

  const onSubmit = ({ email }) => {
    dispatch(forgotPassword(email));
  };
  console.log(forgot_password_error)

  return (
    <>
      {forgot_password_error?.length > 0 && (
        <AlertComponent
          open={true}
          errorName="forgot_password_error"
          message={forgot_password_error}
          status="error"
        />
      )}
      {!forgot_password_loading &&
        !forgot_password_error &&
        forgot_password_success && (
          <AlertComponent
            open={true}
            message={"The password reset token was sent to your email. Please check it!"}
            status="success"
            errorName="forgot_password_success"
          />
        )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 mt-10"
      >
        <div>
          <FormInput
            error={errors?.email}
            {...register("email")}
            name="email"
            label="Email"
          />
        </div>
        {!forgot_password_loading ? (
          <button className="w-full text-white rounded-sm text-lg h-12 flex space-x-2 items-center justify-center bg-gradient-to-r from-pink-500 to-blue-400">
            Send Password Reset
          </button>
        ) : (
          <LoadingButton
            classes="w-full text-white rounded-sm text-lg h-12 bg-gray-500"
            text="Log in"
          />
        )}
      </form>
    </>
  );
};

export const ForgotPassword = () => {
  return (
    <>
      <Head title="Forgot Password" />
      <AuthTemplate
        animationData={forgotPasswordAnimation}
        formTitle="Forgot Password"
        form={ForgotPasswordForm}
      />
    </>
  );
};