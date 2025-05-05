import { Checkbox, FormControl, FormControlLabel, FormGroup, Input, InputAdornment, } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/user";
import { PiEyeSlashThin, PiEyeThin, PiX } from "react-icons/pi";
import toast from "react-hot-toast";

const Login = () => {
  const PasswordButtonInitialStyle = {
    opacity: 0,
  };

  /////////////////////////////////// VARIABLES /////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  /////////////////////////////////// STATES /////////////////////////////////////
  const [userData, setUserData] = useState({ username: "super_admin", password: "password" });
  const [inputError, setInputError] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordButton, setShowPasswordButton] = useState(PasswordButtonInitialStyle);

  /////////////////////////////////// USE EFFECTS ////////////////////////////////

  /////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleChange = (e) => {
    setUserData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = userData;

    if (!validateForm()) return;

    dispatch(login(userData, navigate));
  };

  const validateForm = () => {
    const { username, password } = userData;
    if (!username) {
      toast.error("Username is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  }

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
    <div className="font-primary">
      <div className="md:opacity-100 opacity-0 left-0 bottom-10 absolute h-[53%] w-[28%]">
        <img src="/images/login-1.png" />
      </div>
      <div className="w-full h-screen ">
        <div className="flex justify-center pt-16">
          <img className="h-12" src="/background/A-consultant-logo.png" />
        </div>
        <div className="flex justify-center pt-6 pl-0 ml-0 rounded-lg">
          <div className="w-96 h-auto shadow-xl rounded bg-white">
            <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-8">
              Sign in to your account
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[10px] w-auto pl-[2rem] pt-[2rem] ">
              <div className="flex flex-col gap-8">
                <Input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-[20rem] h-[40px] px-[8px] font-primary"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    onKeyDown={changeBackgroundColor}
                    placeholder="Password"
                    variant="standard"
                    className="w-[20rem] h-[40px] px-[8px]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    startAdornment={
                      <InputAdornment>
                        <button
                          style={showPasswordButton}
                          onClick={handleToggleVisibility}
                          className="absolute right-0">
                          {showPassword ? (
                            <PiEyeSlashThin className="text-[25px] m-2 text-black" />
                          ) : (
                            <PiEyeThin className="text-[25px] m-2 text-black" />
                          )}
                        </button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <FormGroup>
                <FormControlLabel
                  className="w-40 text-gray-400 mt-2"
                  control={<Checkbox style={{ color: "#20aee3" }} />}
                  label="Remember Me"
                />
              </FormGroup>

              <Link to="/auth/forgot_password" className="font-primary font-light flex justify-end mr-10 mb-4 text-gray-500 hover:text-gray-700 cursor-pointer">
                Forgot Password
              </Link>

              <button
                type="submit"
                className={`w-[20rem]  hover:bg-[#45b8e2] p-2 rounded-lg transition-all text-white font-medium tracking-wider ${isFetching ? "bg-[#17a2b8] cursor-not-allowed" : "bg-[#20aee3]"}`}
                variant="contained">
                {isFetching ? "Submitting..." : "Continue"}
              </button>
              <div className="font-Mulish font-light text-slate-500 flex justify-center p-2 pr-7">
                Don't have account?&nbsp;
                <Link to="/auth/register" className="text-sky-400 hover:text-sky-600">
                  {" "}
                  Sign Up
                </Link>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
