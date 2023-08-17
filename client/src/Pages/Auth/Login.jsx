import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/user";
import validator from "email-validator";
import { Opacity, Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const PasswordButtonInitialStyle = {
    opacity: 0,
  };

  /////////////////////////////////// VARIABLES /////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  /////////////////////////////////// STATES /////////////////////////////////////
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [inputError, setInputError] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordButton, setShowPasswordButton] = useState(PasswordButtonInitialStyle)

  /////////////////////////////////// USE EFFECTS ////////////////////////////////

  /////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleChange = (e) => {
    const { email, password } = userData;

    if (validator.validate(email)) setInputError((pre) => ({ ...pre, email: "" }));
    if (password.length > 6) setInputError((pre) => ({ ...pre, password: "" }));

    setUserData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userData;

    if (!email) return setInputError((pre) => ({ ...pre, email: "Email is required" }));
    if (!password) return setInputError((pre) => ({ ...pre, password: "Password is required" }));
    if (password.length < 6)
      return setInputError((pre) => ({
        ...pre,
        password: "Password must be of atleast 6 characters",
      }));

    dispatch(login(userData, navigate));
  };

  const changeBackgroundColor = () => {
    setShowPasswordButton({
      ...showPasswordButton,
      opacity: 1,
    });
  };

  const handleToggleVisibility = (e) => {
    e.preventDefault();
    setShowPassword((pre) => !pre);
  };

  return (
    <div className="py-[10%] ">
      <div className="flex justify-center pb-8 ">
        <img className="w-41 h-11" src="/favicon/GrowLOGO.png" />
      </div>
      <div className="w-full h-full bg-white rounded-lg border-[1px] border-gray-100">
        <div className="flex justify-center pt-6 pl-0 ml-0">
          <div className="w-96 h-auto shadow-xl rounded">
            <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-6 font-Mulish">
              Create New Account
            </p>
            <p className="flex justify-center pt-2 font-Mulish text-slate-500 text-xs">
              Sign up for your new account today!
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[12px] w-auto pl-[2rem] pt-[1rem] ">
              <div className="flex flex-col ">
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-[20rem] h-[40px] px-[8px] border-[1px] border-neutral-500 text-neutral-700 rounded-[4px] "
                />
                {inputError.email && (
                  <span className="text-[12px] text-red-600 ">{inputError.email}</span>
                )}
              </div>
              <div className="flex flex-col relative w-fit ">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  onKeyDown={changeBackgroundColor}
                  placeholder="Password"
                  className="w-[20rem] h-[40px] px-[8px] border-[1px] border-neutral-500 text-neutral-700 rounded-[4px] "
                />
                <button
                  onClick={handleToggleVisibility}
                  style={showPasswordButton}
                  className="absolute top-[50%] right-[4px] transform translate-y-[-50%] cursor-pointer">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
                {inputError.password && (
                  <span className="text-[12px] text-red-600 ">{inputError.password}</span>
                )}
              </div>
              <Button type="submit" className="w-[20rem]" variant="contained">
                {isFetching ? "Submitting..." : "Login"}
              </Button>
              {error && (
                <span className="text-[12px] text-red-600 text-center w-full ">{error}</span>
              )}
              <p className="font-Mulish font-thin text-slate-500 flex justify-center">
                Don't have account?&nbsp;
                <Link to="/auth/register" className="text-blue-400">
                  {" "}
                  Register
                </Link>
              </p>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
