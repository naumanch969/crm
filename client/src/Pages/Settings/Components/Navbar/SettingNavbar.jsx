import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { MenuButton } from "@mui/base/MenuButton";
import { getNotifications } from "../../../../redux/action/notification";
import { logout } from "../../../../redux/action/user";
import {
  PiAlarm,
  PiBell,
  PiGear,
  PiList,
  PiListChecks,
  PiSignOutLight,
  PiTimerLight,
  PiUserPlus,
} from "react-icons/pi";

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
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    transition:all;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
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
    padding: 8px;
    border-radius: 8px;
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

const SettingNavbar = ({ setShowSidebar, showSidebar }) => {
  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const { loggedUser } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  ///////////////////////////////////// STATES ////////////////////////////////////////
  const [date, setDate] = useState(new Date());

  ///////////////////////////////////// USE EFFECTS ////////////////////////////////////////
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });
  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  ///////////////////////////////////// FUNCTIONS ////////////////////////////////////////
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="font-primary">
      <div className="flex flex-col z-10 sticky w-full top-0 sm:h-[4rem] h-[4rem] bg-[#2d4356] text-[#8d97ad] border-b-[1px] border-b-[#eeeff0]">
        <div className="sm:h-full h-[4rem] md:pl-[20px] sm:pl-[1rem] pl-[8px] flex items-center justify-between sm:border-none border-b-[1px] border-[#eeeff0] sm:shadow-none ">
          {/* left section */}
          <div className="flex justify-start gap-[10px] items-center">
          <IconButton
              onClick={() => setShowSidebar((pre) => !pre)}
              className={`md:hidden flex cursor-pointer hover:text-red-400`}>
              <PiList className="text-[25px] text-[#8d97ad]" />
            </IconButton>
            <div>
              <p className="text-red-400 text-xl gap-1 flex items-center">
                <PiTimerLight className="text-[25px]" /> {date.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* right section */}
          <div className="flex gap-[10px] ">
            {/* icons */}
            <div className="sm:flex items-center hidden gap-[10px] ">
              <Dropdown>
                <MenuButton>
                  <Tooltip title="Notifications" arrow placement="bottom">
                    <IconButton
                      className="h-fit hover:text-red-400 inline-block relative"
                      size="small"
                      aria-label="menu">
                      <PiBell className="text-[25px] animate-none text-primary-red" />
                      <span class="animate-ping absolute top-1.5 right-2 block h-1 w-1 rounded-full ring-2 ring-primary-red bg-red-500"></span>
                    </IconButton>
                  </Tooltip>
                </MenuButton>
                <Menu slots={{ listbox: StyledListbox }}>
                  {notifications.length > 0 ? (
                    <div className="flex flex-col gap-[8px] ">
                      {notifications.map((notification, index) => (
                        <React.Fragment key={index}>
                          <StyledMenuItem
                            className={`${
                              notification.isRead ? "bg-gray-100" : "bg-gray-200"
                            } text-gray-600 flex`}>
                            <div className="p-1 pr-2">{notification.avatar}</div>
                            <div>
                              <span className="text-lg font-extralight text-sky-400">
                                {notification.title}
                              </span>
                              <br />
                              {notification.description}
                              <br />
                            </div>
                          </StyledMenuItem>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <span>Your notifications will show here</span>
                  )}
                </Menu>
              </Dropdown>

              <Dropdown>
                <MenuButton>
                  <Tooltip title="Your Tasks" arrow placement="bottom">
                    <IconButton className="h-fit" size="small" aria-label="menu">
                      <PiAlarm className="text-[25px] font-bold hover:text-red-400 text-[#8d97ad]" />
                    </IconButton>
                  </Tooltip>
                </MenuButton>
                <Menu slots={{ listbox: StyledListbox }}>
                  {notifications.map((item, index) => (
                    <React.Fragment key={index}>
                      <StyledMenuItem className="text-gray-600 flex">
                        <div className="p-1 pr-2">{item.avatar}</div>
                        <div>
                          <span className="text-lg font-extralight text-sky-400">{item.name}</span>
                          <br />
                          {item.description}
                          <br />
                        </div>
                      </StyledMenuItem>
                    </React.Fragment>
                  ))}
                </Menu>
              </Dropdown>

              <Link to="/tasks/create">
                <Tooltip title="Add Task" arrow placement="bottom">
                  <IconButton className="h-fit" size="small" aria-label="menu">
                    <PiListChecks className="text-[25px] hover:text-red-400 text-[#8d97ad]" />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title="Settings" arrow placement="bottom">
                <IconButton className="h-fit " size="small" aria-label="menu">
                  <PiGear className="text-[25px] text-[#8d97ad] hover:text-red-400" />
                </IconButton>
              </Tooltip>

              <Link to="/employees/create">
                <Tooltip title="Add User" arrow placement="bottom">
                  <IconButton className="h-fit " size="small" aria-label="menu">
                    <PiUserPlus className="text-[25px] hover:text-red-400 text-[#8d97ad]" />
                  </IconButton>
                </Tooltip>
              </Link>
            </div>
            {/* profile */}
            <div className="flex items-center border-l-[1px] border-l-[#eeeff0] hover:bg-[#354e63]">
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
                  <StyledMenuItem
                    onClick={handleLogout}
                    className="text-gray-600 flex items-center gap-4 font-primary">
                    <PiSignOutLight className="text-xl" /> Logout
                  </StyledMenuItem>
                </Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#67757c] pl-6 pt-4 h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingNavbar;
