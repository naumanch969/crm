import {
  Language,
  MenuOutlined,
  TimerOutlined,
  QuestionAnswerOutlined,
  SettingsOutlined,
  ControlPointDuplicateRounded,
  Logout,
  AddTaskOutlined,
  NotificationsActiveOutlined,
} from "@mui/icons-material";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { MenuButton } from "@mui/base/MenuButton";
import { Link } from "react-router-dom";

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
    height:50vh;
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

const Navbar = ({ setShowSidebar, showSidebar }) => {
  const { loggedUser } = useSelector((state) => state.user);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  let notifications = [
    { avatar: <Avatar />, name: "hamza", description: "Want approval for the lead" },
  ];

  return (
    <>
      <div className="flex flex-col sticky top-0 w-full sm:h-[4rem] h-[4rem] bg-white z-[2000] border-b-[1px] border-b-gray-300">
        <div className="wrapper sm:h-full h-[4rem] md:px-[24px] sm:px-[1rem] px-[8px] flex items-center justify-between sm:border-none border-b-[1px] border-gray-300 sm:shadow-none ">
          {/* left section */}
          <div className="flex justify-start gap-[4px] mt-1">
            <IconButton
              onClick={() => setShowSidebar((pre) => !pre)}
              className="md:hidden flex cursor-pointer hover:text-red-400">
              <MenuOutlined />
            </IconButton>
            <div>
              <p className="text-red-400 mt-1 text-xl">
                <TimerOutlined className="mb-1" /> {date.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* right section */}
          <div className="flex gap-[8px] mt-1">
            {/* icons */}
            <div className="sm:flex items-center hidden gap-[8px] ">
              <Dropdown>
                <MenuButton>
                  <Tooltip title="Notifications" arrow placement="bottom">
                    <IconButton className="h-fit hover:text-red-400" size="small" aria-label="menu">
                      <NotificationsActiveOutlined />
                    </IconButton>
                  </Tooltip>
                </MenuButton>
                <Menu slots={{ listbox: StyledListbox }}>
                  {notifications.map((item) => (
                    <>
                      <StyledMenuItem className="text-gray-600 flex">
                        <div className="p-1 pr-2">{item.avatar}</div>
                        <div>
                          <span className="text-lg font-extralight text-sky-400">{item.name}</span>
                          <br />
                          {item.description}
                          <br />
                        </div>
                      </StyledMenuItem>
                    </>
                  ))}
                </Menu>
              </Dropdown>

              <Link to="/tasks/create">
                <Tooltip title="Add Task" arrow placement="bottom">
                  <IconButton className="h-fit hover:text-red-400" size="small" aria-label="menu">
                    <AddTaskOutlined />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title="Settings" arrow placement="bottom">
                <IconButton className="h-fit hover:text-red-400" size="small" aria-label="menu">
                  <SettingsOutlined />
                </IconButton>
              </Tooltip>

              <Link to="/users/create">
                <Tooltip title="Add User" arrow placement="bottom">
                  <IconButton className="h-fit hover:text-red-400" size="small" aria-label="menu">
                    <ControlPointDuplicateRounded />
                  </IconButton>
                </Tooltip>
              </Link>
            </div>
            {/* profile */}
            <div className="flex items-center ">
              <span className="capitalize ">{loggedUser?.username}</span>
              <Dropdown>
                <MenuButton>
                  <Tooltip title="Profile" arrow placement="bottom">
                    <Avatar className="m-2 cursor-pointer capitalize ">
                      {loggedUser?.username[0]}
                    </Avatar>
                  </Tooltip>
                </MenuButton>
                <Menu slots={{ listbox: StyledListbox }}>
                  <StyledMenuItem className="text-gray-600 font-thin">
                    <Logout className="font-extraLight mb-1" /> Logout
                  </StyledMenuItem>
                </Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
