import {
  NotificationsOutlined,
  Language,
  Settings,
  Menu,
  TimerOutlined,
  QuestionAnswerOutlined,
  SettingsOutlined,
  ControlPointDuplicateRounded,
} from "@mui/icons-material";
import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Navbar = ({ setShowSidebar, showSidebar }) => {
  const { loggedUser } = useSelector((state) => state.user);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div>
      <div className="w-full h-[4rem] bg-white sticky top-0 z-[1000] shadow-none border-b-[1px] border-b-gray-300">
        <div className="wrapper h-full flex items-center justify-between">
          {/* left section */}
          <div className="left flex justify-start">
            
            <IconButton
              onClick={() => setShowSidebar((pre) => !pre)}
              className="md:hidden flex cursor-pointer">
              <Menu className="transition-all m-2" />
            </IconButton>
          </div>

          <div className="flex justify-center">
            <Typography className="text-red-400" variant="h6">
              <TimerOutlined className="mb-1" /> {date.toLocaleTimeString()}
            </Typography>
          </div>

          {/* right section */}
          <div className="flex justify-end gap-5 ">
            <Tooltip title="Timer" arrow placement="bottom">
              <div
                className="hover:text-red-400 my-4 text-zinc-600 cursor-pointer"
                aria-label="menu">
                <TimerOutlined />
              </div>
            </Tooltip>

            <Tooltip title="Timer" arrow placement="bottom">
              <div
                className="hover:text-red-400 my-4 text-zinc-600 cursor-pointer"
                aria-label="menu">
                <QuestionAnswerOutlined />
              </div>
            </Tooltip>

            <Tooltip title="Settings" arrow placement="bottom">
              <div
                className="hover:text-red-400 my-4 text-zinc-600 cursor-pointer"
                aria-label="menu">
                <SettingsOutlined />
              </div>
            </Tooltip>

            <Tooltip title="Add User" arrow placement="bottom">
              <div
                className="hover:text-red-400 my-4 text-zinc-600 cursor-pointer"
                aria-label="menu">
                <ControlPointDuplicateRounded />
              </div>
            </Tooltip>

            <Tooltip title="Language" arrow placement="bottom">
              <div
                className="hover:text-red-400 my-4 text-zinc-600 cursor-pointer"
                aria-label="menu">
                <Language />
              </div>
            </Tooltip>

            <div className="flex items-center ">
              <span className="capitalize ">{loggedUser?.username}</span>
              <Tooltip title="Profile" arrow placement="bottom">
                <Avatar className="m-2 cursor-pointer capitalize ">
                  {loggedUser?.username[0]}
                </Avatar>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[9] px-[1rem] py-[1rem] ">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
