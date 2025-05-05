import { FormControl, Input, InputAdornment, } from "@mui/material";
import { CFormSelect } from "@coreui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/action/user";
import validator from "email-validator";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import { pakistanCities } from "../../constant";
import toast from "react-hot-toast";

const Signup = () => {
  const PasswordButtonInitialStyle = {
    opacity: 0,
  };

  /////////////////////////////////// VARIABLES /////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching } = useSelector((state) => state.user);

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

    if (validateForm()) { return; }

    dispatch(register(userData, navigate))
      .then(() => {
        toast.success("Account Created Successfully. Please Login");
      })
  };

  const validateForm = () => {
    const { firstName, lastName, username, email, phone, password } = userData;

    if (!firstName) {
      toast.error('First Name is required')
      return false;
    }
    if (firstName.length < 3) {
      toast.error('First Name should be atleast of 3 characters')
      return false;
    }
    if (!lastName) {
      toast.error('Last Name is required')
      return false;
    }
    if (lastName.length < 3) {
      toast.error('Last Name should be atleast of 3 characters')
      return false;
    }
    if (!username) {
      toast.error('Username is required')
      return false;
    }
    if (username.length < 3) {
      toast.error('Username should be atleast of 3 characters')
      return false;
    }
    if (email && !validator.validate(email)) {
      toast.error('Make sure to provide a valid email')
      return false;
    }
    if (!phone) {
      toast.error('Phone Number is required')
      return false;
    }
    if (phone.length < 0) {
      toast.error('Please provide a valid phone number')
      return false;
    }
    if (!password) {
      toast.error('Password is required')
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be of atleast 6 characters')
      return false;
    }
    return true;
  }

  const handleToggleVisibility = (e) => {
    e.preventDefault();
    setShowPassword((pre) => !pre);
  };

  const changeBackgroundColor = () => {
    setShowPasswordButton({ ...showPasswordButton, opacity: 1, });
  };


  ////////////////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////
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

              <button
                type="submit"
                className={`w-[20rem]  hover:bg-[#45b8e2] mt-4 p-[6px] rounded-lg transition-all text-white font-medium tracking-wider ${isFetching ? "bg-[#17a2b8]  cursor-not-allowed" : "bg-[#20aee3]"}`}
                variant="contained">
                {isFetching ? "Submitting..." : "Sign Up"}
              </button>

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
