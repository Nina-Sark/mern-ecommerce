import { InputAdornment } from "@mui/material";
import { AuthTemplate } from "../components/AuthTemplate";
import { FormInput } from "../components/FormInput";
import loginAnimation from "../lotties/96833-login.json";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../state/thunk/auth/loginThunk";
import { AlertComponent } from "../components/AlertComponent";
import { CircleSpinner } from "react-spinners-kit";
import { findSearchValue, getSearchValues } from "../utils/getSearchValues";
import { LoadingButton } from "../components/LoadingButton";
import { Head } from "../components/Head";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);

  const { search } = useLocation();
  const navigate = useNavigate();

  const redirect = findSearchValue(getSearchValues(search), "redirect");
  const { user_auth: auth } = useSelector((state) => state.user);

  const { user_auth, auth_login_loading, auth_login_error } = useSelector(
    (state) => state.user
  );

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email isn't valid")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
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
    dispatch(loginThunk(data));
  };

  useEffect(() => {
    if (!auth_login_error && auth) {
      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate("/profile");
      }
    }
  }, [auth_login_error, auth, user_auth]);

  return (
    <>
      {auth_login_error && (
        <AlertComponent
          open={true}
          message={auth_login_error?.error}
          errorName="auth_login_error"
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 mt-10"
      >
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
          <br />
          <Link to="/forgotpassword" className="text-blue-700 text-sm mt-4">
            Forgot password?
          </Link>
        </div>
        <div>
          {!auth_login_loading ? (
            <button className="w-full text-white rounded-sm text-lg h-12 flex space-x-2 items-center justify-center bg-gradient-to-r from-pink-500 to-blue-400">
              Log in
            </button>
          ) : (
            <LoadingButton
              classes="w-full text-white rounded-sm text-lg h-12 bg-gray-500"
              text="Log in"
            />
          )}
          <div className="mt-2">
            <span className="text-sm">Don't have an account yet?</span>
            <Link
              to={`/signup${!redirect ? "" : `?redirect=${redirect}`}`}
              className="text-blue-700 text-sm ml-2"
            >
              Register here
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export const Login = () => {
  const { search } = useLocation();
  const { user_auth: isLoggedin } = useSelector((state) => state.user);
  const redirect =
    findSearchValue(getSearchValues(search), "redirect") || "profile";

  if (isLoggedin) return <Navigate to={`/${redirect}`} />;

  return (
    <>
      <Head title="Login" />
      <AuthTemplate
        animationData={loginAnimation}
        formTitle="log in to your account"
        form={LoginForm}
      />
    </>
  );
};
