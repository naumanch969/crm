import SidebarItem from "./SidebarItem";
import { Box, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import {
  PiBankLight,
  PiCalendarCheckLight,
  PiDatabaseLight,
  PiFolderSimpleUserLight,
  PiFoldersLight,
  PiHardDrivesLight,
  PiHouseLight,
  PiListChecksLight,
  PiLockKeyLight,
  PiMoneyLight,
  PiReceiptLight,
  PiSealCheckLight,
  PiShoppingCartSimpleLight,
  PiUserCircleLight,
  PiUserListLight,
  PiUsersFourLight,
  PiUsersThreeLight,
  PiWarehouseLight,
} from "react-icons/pi";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  //////////////////////////////////////// Variables ////////////////////////////////////////
  const { loggedUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const role = loggedUser?.role;
  const links = [
    {
      id: 1,
      title: "Dashboard",
      link: "/",
      icon: <PiHouseLight className="text-[25px]" />,
      role: ["employee", "manager", "super_admin"],
      childrens: [],
    },
    {
      id: 2,
      title: "Leads",
      icon: <PiUsersThreeLight className="text-[25px]" />,
      link: "/leads",
      role: ["employee", "manager", "super_admin"],
      childrens: [],
    },
    {
      id: 3,
      title: "Inventory",
      icon: <PiFoldersLight className="text-[25px]" />,
      childrens: [
        {
          title: "Societies",
          icon: <PiWarehouseLight className="text-[25px]" />,
          link: "/societies",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "Projects",
          icon: <PiDatabaseLight className="text-[25px]" />,
          link: "/projects",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "Inventories",
          icon: <PiHardDrivesLight className="text-[25px]" />,
          link: "/inventory",
          role: ["employee", "manager", "super_admin"],
        },
      ],
    },
    {
      id: 4,
      title: "To Do Tasks",
      icon: <PiListChecksLight className="text-[25px]" />,
      link: "/tasks",
      role: ["employee", "manager", "super_admin"],
      childrens: [],
    },
    {
      id: 5,
      title: "User",
      icon: <PiUserCircleLight className="text-[25px]" />,
      childrens: [
        {
          title: "Clients",
          icon: <PiUserListLight className="text-[25px]" />,
          link: "/clients",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "Employees",
          icon: <PiUserListLight className="text-[25px]" />,
          link: "/employees",
          role: ["manager", "super_admin"],
        },
      ],
    },
    {
      id: 6,
      title: "Authorization",
      icon: <PiLockKeyLight className="text-[25px]" />,
      childrens: [
        {
          title: "Approvals",
          icon: <PiSealCheckLight className="text-[25px]" />,
          link: "/authorization/request",
          role: ["manager", "super_admin"],
        },
        {
          title: "Refunds",
          icon: <PiMoneyLight className="text-[25px]" />,
          link: "/authorization/refund",
          role: ["manager", "super_admin"],
        },
      ],
    },
    {
      id: 7,
      title: "Sales",
      icon: <PiShoppingCartSimpleLight className="text-[25px]" />,
      role: ["employee", "manager", "super_admin"],
      link: "/sales",
      childrens: [],
    },
    {
      id: 8,
      title: "Cash Book",
      icon: <PiBankLight className="text-[25px]" />,
      childrens: [
        {
          title: "All Cash Book",
          icon: <PiMoneyLight className="text-[25px]" />,
          link: "/cashbook",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "View Cash Book",
          icon: <PiCalendarCheckLight className="text-[25px]" />,
          link: "/view/cashbook",
          role: ["employee", "manager", "super_admin"],
        },
      ],
    },
    {
      id: 9,
      title: "Vouchers",
      icon: <PiReceiptLight className="text-[25px]" />,
      role: ["employee", "manager", "super_admin"],
      link: "/voucher",
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
    <div className={`${pathname.includes("/settings") ? "hidden" : ""}`}>
      {/* desktop sidebar */}
      <Box
        className={`w-[220px] sticky top-0 flex flex-col shadow-none h-screen ${
          showSidebar ? "md:flex hidden" : "hidden"
        } bg-white z-[1000] border-r-[1px] border-r-[#eeeff0] border-b-[1px] border-b-[#eeeff0]`}>
        <a href="/">
          <div className="flex border-b-[1px] border-b-[#eeeff0] h-[4rem] items-center justify-center">
            {!showSidebar ? "" : <img className="h-[45px]" src="/favicon/GrowLOGO.png" />}
          </div>
        </a>
        <div
          style={{ height: "calc(100vh - 4rem)" }}
          className="py-[5px] gap-1 flex flex-col h-fit overflow-y-scroll">
          {filteredLinks.map((link, index) => (
            <SidebarItem
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
        <Box className="absolute top-0 left-0 bg-white shadow-box w-[16rem] h-screen md:hidden flex z-[1100]">
          <div className="wrapper flex flex-col w-full h-full overflow-y-scroll p-[10px]">
            <div className="w-full flex justify-between items-center mb-[1rem] h-[4rem]">
              <img src="/favicon/GrowLOGO.png" />
              <IconButton onClick={() => setShowSidebar(false)}>
                <Close />
              </IconButton>
            </div>
            <div
              style={{ height: "calc(100vh - 4rem)" }}
              className="flex flex-col gap-[5px] py-[6px] overflow-y-scroll ">
              {filteredLinks.map((link, index) => (
                <SidebarItem
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

export default Sidebar;
