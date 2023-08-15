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
    <div className="flex flex-col w-full sm:h-[4rem] h-[7rem] bg-white sticky top-0 z-[1000] sm:shadow-box ">

      <div className="wrapper sm:h-full h-[4rem] md:px-[24px] sm:px-[1rem] px-[8px] flex items-center justify-between sm:border-none border-b-[1px] border-neutral-900 sm:shadow-none shadow-box ">
        {/* left section */}
        <div className="flex justify-start gap-[4px] ">
          <IconButton
            onClick={() => setShowSidebar((pre) => !pre)}
            className="md:hidden flex cursor-pointer ">
            <Menu />
          </IconButton>
          <img src="/favicon/GrowLOGO.png" />
        </div>

        {/* right section */}
        <div className="flex gap-[4px] ">
          {/* icons */}
          <div className="sm:flex items-center hidden gap-[4px] ">
            <Tooltip title="Timer" arrow placement="bottom">
              <IconButton className="h-fit hover:text-red-400" size="small" aria-label="menu">
                <TimerOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Timer" arrow placement="bottom">
              <IconButton className="h-fit hover:text-red-400" size="small" aria-label="menu">
                <QuestionAnswerOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Settings" arrow placement="bottom">
              <IconButton className="h-fit hover:text-red-400" size="small" aria-label="menu">
                <SettingsOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add User" arrow placement="bottom">
              <IconButton className="h-fit hover:text-red-400" size="small" aria-label="menu">
                <ControlPointDuplicateRounded />
              </IconButton>
            </Tooltip>

            <Tooltip title="Language" arrow placement="bottom">
              <IconButton className="h-fit hover:text-red-400" size="small" aria-label="menu">
                <Language />
              </IconButton>
            </Tooltip>
          </div>
          {/* profile */}
          <div className="flex items-center ">
            <span className="capitalize ">{loggedUser?.username}</span>
            <Tooltip title="Profile" arrow placement="bottom">
              <Avatar className="m-2 cursor-pointer capitalize ">{loggedUser?.username[0]}</Avatar>
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
