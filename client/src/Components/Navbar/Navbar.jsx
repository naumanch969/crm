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
import { logout } from "../../redux/action/user";
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
import { getNotifications } from "../../redux/action/notification";
import { getTasks } from "../../redux/action/task";
import ChangePassword from "../../Pages/Auth/ChangePassword";

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

const Navbar = ({ setShowSidebar, showSidebar, open, setOpen }) => {
  /////////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const { loggedUser } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notification);
  const { pathname } = useLocation();
  const { tasks } = useSelector((state) => state.task);
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
  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getTasks());
  }, []);

  /////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const handleChangePasswordOpen = () => {
    setOpenPasswordChange(true);
  };

  return (
    <div className={`${pathname.includes('/client/') || pathname.includes('download') ? 'invisible' : 'visible'}`}>
      <div
        className={`flex flex-col z-10 sticky top-0 w-full sm:h-[4rem] h-[4rem] bg-white border-b-[1px] border-b-[#eeeff0] font-primary`}>
        <div
          className={`sm:h-full h-[4rem] md:pl-[20px] sm:pl-[1rem] pl-[8px] flex items-center justify-between sm:border-none border-b-[1px] border-[#eeeff0] sm:shadow-none`}>
          {/* left section */}
          <div className={`flex justify-start gap-[10px] items-center`}>
            <IconButton
              onClick={() => setShowSidebar((pre) => !pre)}
              className={`md:hidden flex cursor-pointer hover:text-sky-400 ${pathname.includes(
                "/settings" ? "hidden" : ""
              )}`}>
              <PiList className="text-[25px]" />
            </IconButton>
            <div>
              <p className="text-sky-400 text-xl gap-1 flex items-center">
                <PiTimerLight className="text-[25px]" /> {date.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* right section */}
          <div className="flex gap-[20px] ">
            {/* icons */}
            <div className="sm:flex items-center hidden gap-[10px] ">

              {/* Notification */}
              {
                loggedUser.role != 'employee' &&
                <Dropdown>
                  <MenuButton>
                    <Tooltip title="Notifications" arrow placement="bottom">
                      <IconButton
                        className="h-fit hover:text-sky-400 inline-block relative"
                        size="small"
                        aria-label="menu">
                        <PiBell
                          className={`text-[25px] animate-none ${notifications.length > 0 ? "text-sky-400" : ""
                            }`}
                        />
                        {notifications.length > 0 && (
                          <span className="animate-ping absolute top-1.5 right-2 block h-1 w-1 rounded-full ring-2 ring-sky-400 bg-sky-600"></span>
                        )}
                      </IconButton>
                    </Tooltip>
                  </MenuButton>
                  <Menu slots={{ listbox: StyledListbox }}>
                    {notifications.length > 0 ? (
                      <div className="flex flex-col gap-[8px]">
                        <div className="w-full bg-sky-400 font-primary text-2xl text-white p-4">
                          Notifications
                        </div>
                        {notifications.slice(0, 5).map((notification, index) => (
                          <React.Fragment key={index}>
                            <StyledMenuItem
                              onClick={() => navigate("/authorization/refund")}
                              className="text-gray-600 flex items-center gap-2">
                              <div>
                                <Avatar />
                              </div>
                              <div className="font-primary">
                                <span className="text-lg font-light text-sky-400 font-primary">
                                  {notification.title}
                                </span>
                                <br />
                                {notification.description}
                                <br />
                              </div>
                            </StyledMenuItem>
                          </React.Fragment>
                        ))}
                        {notifications.length > 5 && (
                          <Link to="/notifications" className="hover:underline text-blue-500 ">
                            More
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="z-1000 flex flex-col items-center p-2">
                        <img className="p-4" src="/images/notifications.png" />
                        <div className="font-primary text-lg font-light">
                          No Notifications Yet
                        </div>
                      </div>
                    )}
                  </Menu>
                </Dropdown>
              }

              <Dropdown>
                <MenuButton>
                  <Tooltip title="Your Tasks" arrow placement="bottom">
                    <IconButton className="h-fit hover:text-sky-400" size="small" aria-label="menu">
                      <PiAlarm className="text-[25px] font-bold" />
                    </IconButton>
                  </Tooltip>
                </MenuButton>
                <Menu slots={{ listbox: StyledListbox }}>
                  {tasks.slice(0, 5).map((task, index) => (
                    <React.Fragment key={index}>
                      <StyledMenuItem className="text-gray-600 flex">
                        <div>
                          <span className="text-lg font-light text-sky-400">{task.title}</span>
                          <br />
                          {task.description}
                          <br />
                        </div>
                      </StyledMenuItem>
                    </React.Fragment>
                  ))}
                  {tasks.length > 5 && (
                    <Link to="/tasks" className="hover:underline text-blue-500 ">
                      More
                    </Link>
                  )}
                </Menu>
              </Dropdown>

              <Link to="/tasks">
                <Tooltip title="Add Task" arrow placement="bottom">
                  <IconButton className="h-fit hover:text-sky-400" size="small" aria-label="menu">
                    <PiListChecks className="text-[25px]" />
                  </IconButton>
                </Tooltip>
              </Link>

              <Link to="/employees">
                <Tooltip title="Add Employee" arrow placement="bottom">
                  <IconButton className="h-fit hover:text-sky-400" size="small" aria-label="menu">
                    <PiUserPlus className="text-[25px]" />
                  </IconButton>
                </Tooltip>
              </Link>
            </div>
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
      </div>

      <ChangePassword open={openPasswordChange} setOpen={setOpenPasswordChange} />
    </div>
  );
};

export default Navbar;
