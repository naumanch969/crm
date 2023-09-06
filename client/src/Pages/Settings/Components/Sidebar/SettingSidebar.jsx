import { Avatar, Box, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import {
  PiBankLight,
  PiCalendarCheckLight,
  PiDatabaseLight,
  PiFolderOpenLight,
  PiFolderSimpleUserLight,
  PiFoldersLight,
  PiHouseLight,
  PiListChecksLight,
  PiListMagnifyingGlassLight,
  PiLockKeyLight,
  PiMoneyLight,
  PiReceiptLight,
  PiSealCheckLight,
  PiShoppingCartSimpleDuotone,
  PiShoppingCartSimpleLight,
  PiSignOutLight,
  PiUserCircleLight,
  PiUserListLight,
  PiUsersFourLight,
  PiUsersThreeLight,
  PiXLight,
} from "react-icons/pi";
import SettingSidebarItem from "./SettingSidebarItem";
import { IoExitOutline } from "react-icons/io5";

const SettingSidebar = ({ showSidebar, setShowSidebar }) => {
  //////////////////////////////////////// Variables ////////////////////////////////////////
  const { loggedUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const role = loggedUser?.role;
  const links = [
    {
      id: 1,
      title: "Dashboard",
      link: "/settings/dashboard",
      role: ["employee", "manager", "super_admin"],
      childrens: [],
    },
    {
      id: 2,
      title: "Leads",
      link: "/settings/lead",
      role: ["employee", "manager", "super_admin"],
      childrens: [],
    },
    {
      id: 3,
      title: "Projects",
      link: "/settings/project",
      role: ["employee", "manager", "super_admin"],
      childrens: [],
    },
    {
      id: 4,
      title: "To Do Tasks",
      link: "/settings/task",
      role: ["employee", "manager", "super_admin"],
      childrens: [],
    },
    {
      id: 5,
      title: "User",
      role: ["employee", "manager", "super_admin"],
      link: "/settings/user",
      childrens: [],
    },
    {
      id: 6,
      title: "Authorization",
      role: ["employee", "manager", "super_admin"],
      link: "/settings/authorization",
      childrens: [],
    },
    {
      id: 7,
      title: "Sales",
      role: ["employee", "manager", "super_admin"],
      link: "/settings/sale",
      childrens: [],
    },
    {
      id: 8,
      title: "Vouchers",
      role: ["employee", "manager", "super_admin"],
      link: "/settings/voucher",
      childrens: [],
    },
  ];

  const filteredLinks = links.map((link) => {
    const filteredLink = { ...link };

    if (!filteredLink.role || filteredLink.role.includes(role)) {
      if (filteredLink.childrens) {
        filteredLink.childrens = filteredLink.childrens.filter(
          (childLink) => !childLink.role || childLink.role.includes(role)
        );
      }
      return filteredLink;
    }
  });

  const [openedMenu, setOpenedMenu] = useState(false);

  return (
    <div>
      {/* desktop sidebar */}
      <Box
        className={`w-[220px] top-0 fixed flex flex-col shadow-none h-screen ${
          showSidebar ? "md:flex hidden" : "hidden"
        } bg-[#2d4356] z-[1000] border-r-[1px] border-r-[#eeeff0] border-b-[#eeeff0]`}>
        <a href="/">
          <div className="flex border-b-[1px] border-b-[#eeeff0] h-[4rem] items-center p-4 bg-[#2d4356]">
            <Link to="/" className="flex items-center text-2xl font-primary gap-2 text-sky-500">
              <IoExitOutline className="text-3xl" /> Exit
            </Link>
          </div>
        </a>
        <div
          style={{ height: "calc(100vh - 4rem)" }}
          className="py-[5px] gap-1 flex flex-col h-fit">
          {filteredLinks.map((link, index) => (
            <SettingSidebarItem
              item={link}
              key={index}
              openedMenu={openedMenu}
              setOpenedMenu={setOpenedMenu}
              setShowSidebar={setShowSidebar}
            />
          ))}
        </div>
        {/* </div> */}
      </Box>

      {/* mobile sidebar */}
      {showSidebar && (
        <Box className="absolute top-0 left-0 bg-[#2d4356] shadow-box w-[16rem] h-screen md:hidden flex z-[1100]">
          <div className="wrapper flex flex-col w-full h-full p-[10px]">
            <div className="w-full flex justify-between items-center mb-[1rem] h-[4rem]">
              <img src="/favicon/GrowLOGO.png" />
              <IconButton onClick={() => setShowSidebar(false)}>
                <PiXLight className="text-[25px] text-[#8d97ad]" />
              </IconButton>
            </div>
            <div
              style={{ height: "calc(100vh - 4rem)" }}
              className="flex flex-col gap-[5px] py-[6px] ">
              {filteredLinks.map((link, index) => (
                <SettingSidebarItem
                  item={link}
                  key={index}
                  openedMenu={openedMenu}
                  setOpenedMenu={setOpenedMenu}
                />
              ))}
            </div>
          </div>
        </Box>
      )}
    </div>
  );
};

export default SettingSidebar;
