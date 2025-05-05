import {
  Alert,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Snackbar,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, register } from "../../redux/action/user";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PiEyeSlashThin, PiEyeThin, PiX, PiXLight } from "react-icons/pi";
import { Modal, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const ChangePassword = ({ open, setOpen }) => {
  const PasswordButtonInitialStyle = { opacity: 0 };

  /////////////////////////////////// VARIABLES /////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  /////////////////////////////////// STATES /////////////////////////////////////
  const [passwordData, setPasswordData] = useState({ newPassword: "", oldPassword: "" });
  const [inputError, setInputError] = useState({ newPassword: "", oldPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordButton, setShowPasswordButton] = useState(PasswordButtonInitialStyle);
  const [showSnackbar, setShowSnackbar] = useState(false);

  //////////////////////////////////////// USE EFFECTS ////////////////////////////////

  /////////////////////////////////// FUNCTIONS //////////////////////////////////
  const handleChange = (field, value) => {
    setPasswordData((pre) => ({ ...pre, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = passwordData;

    if (!oldPassword)
      return setInputError((pre) => ({ ...pre, firstName: "Previous password is required" }));
    if (!newPassword)
      return setInputError((pre) => ({ ...pre, firstName: "New password is required" }));
    if (newPassword < 6)
      return setInputError((pre) => ({
        ...pre,
        firstName: "New password length should contain atleast 6 characters.",
      }));

    dispatch(changePassword(passwordData, navigate))
      .then(() => {
        setPasswordData({ newPassword: "", oldPassword: "" });
        setInputError({ newPassword: "", oldPassword: "" });
        setOpen(false);
      })
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} fullWidth="sm" onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          <div className="flex justify-between">
            <div className="font-primary">Change Password</div>
            <div>
              <PiXLight onClick={() => setOpen(false)} className="text-[25px] cursor-pointer" />
            </div>
          </div>
        </DialogTitle>
        <DialogContent className="flex flex-col gap-4">
          <div>
            <TextField
              value={passwordData.oldPassword}
              placeholder="Enter Your Old Password"
              onChange={(e) => handleChange("oldPassword", e.target.value)}
              size="small"
              fullWidth
              type="password"
            />
          </div>
          <div>
            <TextField
              value={passwordData.newPassword}
              placeholder="Enter Your New Password"
              onChange={(e) => handleChange("newPassword", e.target.value)}
              size="small"
              fullWidth
              type="password"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-primary"
            onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-primary"
            onClick={handleSubmit}
            autoFocus>
            Change
          </button>
        </DialogActions>
      </Dialog>
    </div>
    // <div className="font-primary w-full h-full ">
    //     <div className="md:opacity-100 opacity-0 left-0 bottom-[-20%] absolute h-[52%] w-[25%]">
    //         <img src="/images/login-1.png" />
    //     </div>
    //     <div className="pb-10">
    //         <div className="flex justify-center pt-8">
    //             <img className="w-41 h-11" src="/favicon/GrowLOGO.png" />
    //         </div>
    //         <div className="flex justify-center pt-6 pl-0 ml-0 rounded-lg">
    //             <div className="w-96 h-auto shadow-xl rounded bg-white">
    //                 <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-6">
    //                     Change Your Password
    //                 </p>
    //                 <form
    //                     onSubmit={handleSubmit}
    //                     className="flex flex-col gap-[1.5rem] w-auto p-[1rem] rounded-[8px] "
    //                 >
    //                     <div className="flex flex-col gap-6">
    //                         {/* old password */}
    //                         <FormControl>
    //                             <Input
    //                                 type={showPassword ? "text" : "password"}
    //                                 value={passwordData.oldPassword}
    //                                 onChange={(e) => handleChange("oldPassword", e.target.value)}
    //                                 onKeyDown={changeBackgroundColor}
    //                                 placeholder="Your Previous Password"
    //                                 variant="standard"
    //                                 className="w-full h-[40px] px-[8px]"
    //                                 style={{ fontFamily: "'Montserrat', sans-serif" }}
    //                                 startAdornment={
    //                                     <InputAdornment>
    //                                         <button
    //                                             style={showPasswordButton}
    //                                             onClick={handleToggleVisibility}
    //                                             className="absolute right-0">
    //                                             {showPassword ? (
    //                                                 <PiEyeSlashThin className="text-[25px] m-2 text-black" />
    //                                             ) : (
    //                                                 <PiEyeThin className="text-[25px] m-2 text-black" />
    //                                             )}
    //                                         </button>
    //                                     </InputAdornment>
    //                                 }
    //                             />
    //                         </FormControl>
    //                     </div>

    //                     {inputError.oldPassword && (
    //                         <Snackbar open={showSnackbar} autoHideDuration={1000}>
    //                             <Alert
    //                                 className="flex items-center justify-between"
    //                                 severity="error"
    //                                 sx={{ width: "100%" }}>
    //                                 {inputError.oldPassword}
    //                                 <IconButton
    //                                     onClick={handleCloseSnackbar}
    //                                     aria-label="close"
    //                                     color="inherit"
    //                                     sx={{ p: 0.5, ml: 10 }}>
    //                                     <PiX />
    //                                 </IconButton>
    //                             </Alert>
    //                         </Snackbar>
    //                     )}

    //                     <div className="flex flex-col gap-6">
    //                         {/* new password */}
    //                         <FormControl>
    //                             <Input
    //                                 type={showPassword ? "text" : "password"}
    //                                 value={passwordData.newPassword}
    //                                 onChange={(e) => handleChange("newPassword", e.target.value)}
    //                                 onKeyDown={changeBackgroundColor}
    //                                 placeholder="Enter New Password"
    //                                 variant="standard"
    //                                 className="w-full h-[40px] px-[8px]"
    //                                 style={{ fontFamily: "'Montserrat', sans-serif" }}
    //                                 startAdornment={
    //                                     <InputAdornment>
    //                                         <button
    //                                             style={showPasswordButton}
    //                                             onClick={handleToggleVisibility}
    //                                             className="absolute right-0">
    //                                             {showPassword ? (
    //                                                 <PiEyeSlashThin className="text-[25px] m-2 text-black" />
    //                                             ) : (
    //                                                 <PiEyeThin className="text-[25px] m-2 text-black" />
    //                                             )}
    //                                         </button>
    //                                     </InputAdornment>
    //                                 }
    //                             />
    //                         </FormControl>
    //                     </div>

    //                     {inputError.newPassword && (
    //                         <Snackbar open={showSnackbar} autoHideDuration={1000}>
    //                             <Alert
    //                                 className="flex items-center justify-between"
    //                                 severity="error"
    //                                 sx={{ width: "100%" }}>
    //                                 {inputError.newPassword}
    //                                 <IconButton
    //                                     onClick={handleCloseSnackbar}
    //                                     aria-label="close"
    //                                     color="inherit"
    //                                     sx={{ p: 0.5, ml: 10 }}>
    //                                     <PiX />
    //                                 </IconButton>
    //                             </Alert>
    //                         </Snackbar>
    //                     )}

    //                     <button
    //                         onClick={handleOpenSnackbar}
    //                         type="submit"
    //                         className={`w-full hover:bg-[#45b8e2] mt-4 p-[6px] rounded-lg transition-all text-white font-medium tracking-wider ${isFetching ? "bg-[#17a2b8]  cursor-not-allowed" : "bg-[#20aee3]"
    //                             }`}
    //                         variant="contained">
    //                         {isFetching ? "Submitting..." : "Change"}
    //                     </button>
    //                     {error && (
    //                         <Snackbar open={showSnackbar} autoHideDuration={1000}>
    //                             <Alert
    //                                 className="flex items-center justify-between"
    //                                 severity="error"
    //                                 sx={{ width: "100%" }}
    //                             >
    //                                 {error}
    //                                 <IconButton
    //                                     onClick={handleCloseSnackbar}
    //                                     aria-label="close"
    //                                     color="inherit"
    //                                     sx={{ p: 0.5, ml: 10 }}>
    //                                     <PiX />
    //                                 </IconButton>
    //                             </Alert>
    //                         </Snackbar>
    //                     )}
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
};

export default ChangePassword;
