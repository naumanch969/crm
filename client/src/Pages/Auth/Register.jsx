import {
  Alert,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Snackbar,
  InputLabel,
} from "@mui/material";
import { CFormSelect } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/action/user";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import validator from "email-validator";
import { PiEyeSlashThin, PiEyeThin, PiX } from "react-icons/pi";
import { pakistanCities } from "../../constant";

const Signup = () => {
  const PasswordButtonInitialStyle = {
    opacity: 0,
  };

  /////////////////////////////////// VARIABLES /////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  /////////////////////////////////// STATES /////////////////////////////////////
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
    city: "",
    password: "",
  });
  const [inputError, setInputError] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordButton, setShowPasswordButton] = useState(PasswordButtonInitialStyle);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////

  /////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleChange = (field, value) => {
    const { firstName, lastName, username, email, phone, password } = userData;

    if (firstName.length > 3) setInputError((pre) => ({ ...pre, firstName: "" }));
    if (lastName.length < 3) setInputError((pre) => ({ ...pre, lastName: "" }));
    if (username.length < 3) setInputError((pre) => ({ ...pre, username: "" }));
    if (validator.validate(email)) setInputError((pre) => ({ ...pre, email: "" }));
    if (phone.length >= 10) setInputError((pre) => ({ ...pre, phone: "" }));
    if (password.length > 6) setInputError((pre) => ({ ...pre, password: "" }));

    setUserData((pre) => ({ ...pre, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, email, phone, password } = userData;

    if (!firstName)
      return setInputError((pre) => ({ ...pre, firstName: "First Name is required" }));
    if (firstName.length < 3)
      return setInputError((pre) => ({
        ...pre,
        firstName: "First Name should be atleast of 3 characters",
      }));
    if (!lastName) return setInputError((pre) => ({ ...pre, lastName: "Last Name is required" }));
    if (lastName.length < 3)
      return setInputError((pre) => ({
        ...pre,
        lastName: "Last Name should be atleast of 3 characters",
      }));
    if (!username) return setInputError((pre) => ({ ...pre, username: "Username is required" }));
    if (username.length < 3)
      return setInputError((pre) => ({
        ...pre,
        username: "Username should be atleast of 3 characters",
      }));
    if (email && !validator.validate(email))
      return setInputError((pre) => ({ ...pre, email: "Make sure to provide a valid email" }));
    if (!phone) return setInputError((pre) => ({ ...pre, phone: "Phone Number is required" }));
    if (phone.length < 0)
      return setInputError((pre) => ({ ...pre, phone: "Please provide a valid phone number" }));
    if (!password) return setInputError((pre) => ({ ...pre, password: "Password is required" }));
    if (password.length < 6)
      return setInputError((pre) => ({
        ...pre,
        password: "Password must be of atleast 6 characters",
      }));

    dispatch(register(userData, navigate));
  };

  const handleToggleVisibility = (e) => {
    e.preventDefault();
    setShowPassword((pre) => !pre);
  };

  const changeBackgroundColor = () => {
    setShowPasswordButton({
      ...showPasswordButton,
      opacity: 1,
    });
  };

  const handleOpenSnackbar = () => {
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <div className="font-primary w-full h-full bg-[#F6F9FA]">
      <div className="md:opacity-100 opacity-0 left-0 bottom-[-4%] absolute h-[52%] w-[25%]">
        <img src="/images/login-1.png" />
      </div>
      <div className="pb-10">
        <div className="flex justify-center pt-8">
          <img className="h-12" src="/background/A-consultant-logo.png" />
        </div>
        <div className="flex justify-center pt-6 pl-0 ml-0 rounded-lg">
          <div className="w-96 h-auto shadow-xl rounded bg-white">
            <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-6">
              Create New Account
            </p>
            <p className="flex justify-center pt-2 font-Mulish text-slate-500 text-xs">
              Sign up for your new account today!
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[12px] w-auto pl-[2rem] pt-[1rem] ">
              <div className="flex flex-col gap-6">
                {/* firstname */}
                <Input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="First Name"
                  variant="standard"
                  className="w-[20rem] h-[40px] px-[8px]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                {inputError.firstName && (
                  <Snackbar position="top" open={showSnackbar} autoHideDuration={1000}>
                    <Alert
                      className="flex items-center justify-between"
                      severity="error"
                      sx={{ width: "100%" }}>
                      {inputError.firstName}
                      <IconButton
                        onClick={handleCloseSnackbar}
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5, ml: 10 }}>
                        <PiX />
                      </IconButton>
                    </Alert>
                  </Snackbar>
                )}
                {/* lastname */}
                <Input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Last Name"
                  variant="standard"
                  className="w-[20rem] h-[40px] px-[8px]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                {inputError.lastName && (
                  <Snackbar open={showSnackbar} autoHideDuration={1000}>
                    <Alert
                      className="flex items-center justify-between"
                      severity="error"
                      sx={{ width: "100%" }}>
                      {inputError.lastName}
                      <IconButton
                        onClick={handleCloseSnackbar}
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5, ml: 10 }}>
                        <PiX />
                      </IconButton>
                    </Alert>
                  </Snackbar>
                )}
                {/* username */}
                <Input
                  type="text"
                  value={userData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  placeholder="Username"
                  variant="standard"
                  className="w-[20rem] h-[40px] px-[8px]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                {inputError.username && (
                  <Snackbar open={showSnackbar} autoHideDuration={1000}>
                    <Alert
                      className="flex items-center justify-between"
                      severity="error"
                      sx={{ width: "100%" }}>
                      {inputError.username}
                      <IconButton
                        onClick={handleCloseSnackbar}
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5, ml: 10 }}>
                        <PiX />
                      </IconButton>
                    </Alert>
                  </Snackbar>
                )}
                {/* city */}
                <FormControl>
                  <CFormSelect
                    value={userData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-[20rem] h-[40px] px-[8px] border-b-[1px] p-2 border-[#c1c1c1] cursor-pointer text-black"
                  >
                    <option value={""}>City</option>
                    {pakistanCities.map((city, key) => (
                      <option key={key} value={city}>
                        {city}
                      </option>
                    ))}
                  </CFormSelect>
                </FormControl>
                {/* phone */}
                <Input
                  type="number"
                  value={userData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Phone"
                  variant="standard"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="w-[20rem] h-[40px] px-[8px]"
                />
                {inputError.phone && (
                  <Snackbar open={showSnackbar} autoHideDuration={1000}>
                    <Alert
                      className="flex items-center justify-between"
                      severity="error"
                      sx={{ width: "100%" }}>
                      {inputError.phone}
                      <IconButton
                        onClick={handleCloseSnackbar}
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5, ml: 10 }}>
                        <PiX />
                      </IconButton>
                    </Alert>
                  </Snackbar>
                )}
                {/* email */}
                <Input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Email"
                  variant="standard"
                  className="w-[20rem] h-[40px] px-[8px]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
                {inputError.email && (
                  <Snackbar open={showSnackbar} autoHideDuration={1000}>
                    <Alert
                      className="flex items-center justify-between"
                      severity="error"
                      sx={{ width: "100%" }}>
                      {inputError.email}
                      <IconButton
                        onClick={handleCloseSnackbar}
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5, ml: 10 }}>
                        <PiX />
                      </IconButton>
                    </Alert>
                  </Snackbar>
                )}
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={userData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
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

              {inputError.password && (
                <Snackbar open={showSnackbar} autoHideDuration={1000}>
                  <Alert
                    className="flex items-center justify-between"
                    severity="error"
                    sx={{ width: "100%" }}>
                    {inputError.password}
                    <IconButton
                      onClick={handleCloseSnackbar}
                      aria-label="close"
                      color="inherit"
                      sx={{ p: 0.5, ml: 10 }}>
                      <PiX />
                    </IconButton>
                  </Alert>
                </Snackbar>
              )}

              <button
                onClick={handleOpenSnackbar}
                type="submit"
                className={`w-[20rem]  hover:bg-[#45b8e2] mt-4 p-[6px] rounded-lg transition-all text-white font-medium tracking-wider ${isFetching ? "bg-[#17a2b8]  cursor-not-allowed" : "bg-[#20aee3]"
                  }`}
                variant="contained">
                {isFetching ? "Submitting..." : "Sign Up"}
              </button>
              {error && (
                <Snackbar open={showSnackbar} autoHideDuration={1000}>
                  <Alert
                    className="flex items-center justify-between"
                    severity="error"
                    sx={{ width: "100%" }}>
                    {error}
                    <IconButton
                      onClick={handleCloseSnackbar}
                      aria-label="close"
                      color="inherit"
                      sx={{ p: 0.5, ml: 10 }}>
                      <PiX />
                    </IconButton>
                  </Alert>
                </Snackbar>
              )}
              <p className="font-Mulish font-light text-slate-500 pl-10">
                Already have an account?
                <Link to="/auth/login" className="text-sky-400 hover:text-sky-600">
                  {" "}
                  Login
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

export default Signup;
