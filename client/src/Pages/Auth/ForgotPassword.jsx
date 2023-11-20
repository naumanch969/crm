import {
  Alert,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiEyeSlashThin, PiEyeThin, PiX } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forget_password } from "../../redux/action/user";

const ForgotPassword = () => {
  /////////////////////////////////// VARIABLES /////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /////////////////////////////////// STATES /////////////////////////////////////
  const [email, setEmail] = useState({ email: "" });

  /////////////////////////////////// USE EFFECTS ////////////////////////////////

  /////////////////////////////////// FUNCTIONS //////////////////////////////////

  const handleInputChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forget_password(email));
    setEmail({ email: "" });
    navigate("/auth/newpassword");
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
            <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-6">
              Forgot Password
            </p>
            <p className="flex justify-center text-center pt-2 font-Mulish text-slate-500 text-xs px-10">
              Enter your email address below and we'll send you a link to reset your password.
            </p>
            <div className="flex flex-col gap-[10px] w-auto pl-[2rem] pt-[2rem] ">
              <div className="flex flex-col gap-8">
                <Input
                  type="string"
                  name="email"
                  value={email.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email Here"
                  className="w-[20rem] h-[40px] px-[8px] font-primary"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
              <br />
              <button
                onClick={handleSubmit}
                className={`w-[20rem] bg-[#42acd2] hover:bg-[#45b8e2] p-2 rounded-lg transition-all text-white font-medium tracking-wider `}
                variant="contained">
                Send Code
              </button>
              <div className="font-primary font-light text-slate-500 flex justify-center p-2 pr-7">
                <Link to="/auth/login" className="text-sky-400 hover:text-sky-600">
                  Back To Login Page
                </Link>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
