import { Avatar, Divider, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { MenuButton } from "@mui/base/MenuButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { logout } from "../redux/action/user";
import {
  PiAlarm,
  PiBell,
  PiGear,
  PiKeyLight,
  PiList,
  PiListChecks,
  PiSignOutLight,
  PiTimerLight,
  PiUserPlus,
} from "react-icons/pi";
import ChangePassword from "../Pages/Auth/ChangePassword";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledListbox = styled("ul")(
  ({ theme }) => `
    font-family: 'Montserrat', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    transition:all;
    margin: 12px 0;
    min-width: 200px;
    max-width: 400px;
    border-radius: 12px;
    overflow: auto;
    position: relative;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${theme.palette.mode === "dark" ? grey[900] : grey[200]};
    z-index: 1;
    `
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
    list-style: none;
    padding: 10px;
    cursor: pointer;
    user-select: none;
    &:last-of-type {
      border-bottom: none;
    }
    
    &.${menuItemClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
    `
);

const ClientNavbar = () => {
  /////////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const { loggedUser } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /////////////////////////////////////////// STATES ////////////////////////////////////////////////
  const [date, setDate] = useState(new Date());
  const [openPasswordChange, setOpenPasswordChange] = useState(false);

  /////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  /////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const handleChangePasswordOpen = () => {
    setOpenPasswordChange(true);
  };

  return (
    <div
      className={`flex flex-col z-10 sticky top-0 w-full sm:h-[4rem] h-[4rem] bg-white border-b-[1px] border-b-[#eeeff0] font-primary`}>
      <div
        className={`sm:h-full h-[4rem] md:pl-[20px] sm:pl-[1rem] pl-[8px] flex items-center justify-between sm:border-none border-b-[1px] border-[#eeeff0] sm:shadow-none`}>
        {/* Left section */}
        <div>
          <img className="h-12" src="/background/A-consultant-logo.png" />
        </div>

        {/* Center section */}
        <div>
          <p className="text-sky-400 text-xl gap-1 flex items-center sm:visible invisible">
            <PiTimerLight className="text-[25px]" /> {date.toLocaleTimeString()}
          </p>
        </div>

        {/* Right section */}
        <div className="flex gap-[20px] ">
          {/* profile */}
          <div className="flex items-center border-l-[1px] border-l-[#eeeff0] hover:bg-gray-100">
            <Dropdown>
              <MenuButton>
                <Tooltip className="flex items-center" title="Profile" arrow placement="bottom">
                  <Avatar className="m-3 cursor-pointer capitalize ">
                    {loggedUser?.username[0]}
                  </Avatar>
                  <span className="capitalize pr-3">{loggedUser?.username}</span>
                </Tooltip>
              </MenuButton>

              <Menu slots={{ listbox: StyledListbox }}>
                <div className="p-2 flex justify-center items-center">
                  <div className="text-lg font-primary">{loggedUser?.username}</div>
                </div>
                <Divider />
                <StyledMenuItem
                  onClick={handleLogout}
                  className="text-gray-600 flex items-center gap-4 font-primary">
                  <PiSignOutLight className="text-xl" /> Logout
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={handleChangePasswordOpen}
                  className="text-gray-600 flex items-center gap-4 font-primary">
                  <PiKeyLight className="text-xl" /> Change Password
                </StyledMenuItem>
              </Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <ChangePassword open={openPasswordChange} setOpen={setOpenPasswordChange} />
    </div>
  );
};

export default ClientNavbar;
