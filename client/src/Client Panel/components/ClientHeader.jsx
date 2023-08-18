import { HomeOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Box, Toolbar, Tooltip } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const ClientHeader = () => {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar className="bg-white">
          <div className="flex justify-between items-center flex-grow-[1]">
            <div className="flex flex-col justify-start">
              <Link to="/client/dashboard">
                <img src="/favicon/GrowLOGO.png" />
              </Link>
            </div>
            <div className="flex justify-end items-center gap-[40px] font-thin">
              <Link className="text-black hover:text-sky-600" to="/client/home">
                HOME
              </Link>
              <Link className="text-black hover:text-sky-600" to="/client/projects">
                YOUR PROJECTS
              </Link>
              <Link className="text-black hover:text-sky-600" to="/client/contact">
                CONTACT US
              </Link>
              <Link className="text-black hover:text-sky-600" to="/login">
                LOGOUT
              </Link>
              <Tooltip title="Profile" arrow placement="bottom" className="cursor-pointer">
                <Avatar>H</Avatar>
              </Tooltip>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <div className="bg-gray-100">
        <Outlet />
      </div>
    </Box>
  );
};

export default ClientHeader;
