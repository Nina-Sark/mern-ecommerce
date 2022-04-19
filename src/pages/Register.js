import { InputAdornment } from "@mui/material";
import { AuthTemplate } from "../components/AuthTemplate";
import { FormInput } from "../components/FormInput";
import registerAnimation from "../lotties/50124-user-profile.json";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { findSearchValue, getSearchValues } from "../utils/getSearchValues";
import { useDispatch, useSelector } from "react-redux";
import { signupThunk } from "../state/thunk/auth/signupThunk";
import { AlertComponent } from "../components/AlertComponent";
import { LoadingButton } from "../components/LoadingButton";
import { Head } from "../components/Head";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hidden, setHidden] = useState(true);
  const [confirmPassHidden, setConfirmPassHidden] = useState(true);

  const { user_auth: auth } = useSelector((state) => state.user);

  const { search } = useLocation();
  const redirect = findSearchValue(getSearchValues(search), "redirect");

  const { user_auth, auth_signup_loading, auth_signup_error } = useSelector(
    (state) => state.user
  );

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email isn't valid").required("Email required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords don't match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(signupThunk(data));
  };

  useEffect(() => {
    if (!auth_signup_error && auth) {
      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate("/profile");
      }
    }
  }, [auth_signup_error, auth]);

  return (
    <>
      {auth_signup_error && (
        <AlertComponent
          open={true}
          message={auth_signup_error?.error}
          errorName="auth_signup_error"
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 mt-10"
      >
        <div>
          <FormInput
            error={errors?.name}
            label="Name"
            name="name"
            {...register("name")}
          />
        </div>
        <div>
          <FormInput
            error={errors?.email}
            label="Email"
            name="email"
            {...register("email")}
          />
        </div>
        <div>
          <FormInput
            {...register("password")}
            error={errors?.password}
            name="password"
            label="Password"
            type={hidden ? "password" : "text"}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  onClick={() => setHidden(!hidden)}
                  position="end"
                >
                  {hidden ? (
                    <FaEye style={{ cursor: "pointer" }} fontSize={25} />
                  ) : (
                    <FaEyeSlash style={{ cursor: "pointer" }} fontSize={25} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <FormInput
            {...register("confirmPassword")}
            error={errors?.confirmPassword}
            name="confirmPassword"
            label="Confirm password"
            type={confirmPassHidden ? "password" : "text"}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  onClick={() => setConfirmPassHidden(!confirmPassHidden)}
                  position="end"
                >
                  {confirmPassHidden ? (
                    <FaEye style={{ cursor: "pointer" }} fontSize={25} />
                  ) : (
                    <FaEyeSlash style={{ cursor: "pointer" }} fontSize={25} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          {!auth_signup_loading ? (
            <button className="w-full text-white rounded-sm text-lg h-12 flex space-x-2 items-center justify-center bg-gradient-to-r from-pink-500 to-blue-400">
              Sign up
            </button>
          ) : (
            <LoadingButton
              classes="w-full text-white rounded-sm text-lg h-12 bg-gray-500"
              text="Sign up"
            />
          )}
          <div className="mt-2">
            <span className="text-sm">Already have an account?</span>
            <Link
              to={`/login${redirect ? `?redirect=${redirect}` : ""}`}
              className="text-blue-700 text-sm ml-2"
            >
              Log in here
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export const Register = () => {
  const { search } = useLocation();
  const { user_auth: auth } = useSelector((state) => state.user);
  const redirect =
    findSearchValue(getSearchValues(search), "redirect") || "profile";

  if (auth) {
    return <Navigate to={`/${redirect}`} />;
  }

  return (
    <>
      <Head title="Sign up" />
      <AuthTemplate
        animationData={registerAnimation}
        formTitle="create an account"
        form={RegisterForm}
      />
    </>
  );
};
