import SidebarItem from "./SidebarItem";
import { Avatar, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
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
  PiUserCircleLight,
  PiUserListLight,
  PiUsersFourLight,
  PiUsersThreeLight,
} from "react-icons/pi";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  //////////////////////////////////////// Variables ////////////////////////////////////////
  const { loggedUser } = useSelector((state) => state.user);
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
      childrens: [
        {
          title: "Create Lead",
          icon: <CiEdit className="text-[25px]" />,
          link: "/leads/create",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "My Leads",
          icon: <PiFolderSimpleUserLight className="text-[25px]" />,
          link: "/myLeads",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "Get All Leads",
          icon: <PiUsersFourLight className="text-[25px]" />,
          link: "/leads?type=all",
          role: ["employee", "manager", "super_admin"],
        },
      ],
    },
    {
      id: 3,
      title: "Projects",
      icon: <PiFoldersLight className="text-[25px]" />,
      childrens: [
        {
          title: "All Projects",
          icon: <PiFolderOpenLight className="text-[25px]" />,
          link: "/projects",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "Create Project",
          icon: <CiEdit className="text-[25px]" />,
          link: "/projects/create",
          role: ["employee", "manager", "super_admin"],
        },
      ],
    },
    {
      id: 4,
      title: "To Do Tasks",
      icon: <PiListChecksLight className="text-[25px]" />,
      childrens: [
        {
          title: "Create Task",
          icon: <CiEdit className="text-[25px]" />,
          link: "tasks/create",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "My Tasks",
          icon: <PiListMagnifyingGlassLight className="text-[25px]" />,
          link: "/tasks",
          role: ["employee", "manager", "super_admin"],
        },
      ],
    },
    {
      id: 5,
      title: "User",
      icon: <PiUserCircleLight className="text-[25px]" />,
      childrens: [
        {
          title: "Create Employee",
          icon: <CiEdit className="text-[25px]" />,
          link: "/employees/create",
          role: ["manager", "super_admin"],
        },
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
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "Refunds",
          icon: <PiMoneyLight className="text-[25px]" />,
          link: "/authorization/refund",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "Vouchers",
          icon: <PiReceiptLight className="text-[25px]" />,
          link: "/voucher",
          role: ["employee", "manager", "super_admin"],
        },
      ],
    },
    {
      id: 7,
      title: "Sales",
      icon: <PiShoppingCartSimpleLight className="text-[25px]" />,
      childrens: [
        {
          title: "Generate Sale",
          icon: <CiEdit className="text-[25px]" />,
          link: "/sales/create",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "All Sales",
          icon: <PiShoppingCartSimpleDuotone className="text-[25px]" />,
          link: "/sales",
          role: ["employee", "manager", "super_admin"],
        },
      ],
    },
    {
      id: 8,
      title: "Cash Book",
      icon: <PiBankLight className="text-[25px]" />,
      childrens: [
        {
          title: "Today Cash Book",
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
      childrens: [
        {
          title: "All Vouchers",
          icon: <PiDatabaseLight className="text-[25px]" />,
          link: "/voucher",
          role: ["employee", "manager", "super_admin"],
        },
        {
          title: "Create Voucher",
          icon: <CiEdit className="text-[25px]" />,
          link: "/voucher/create",
          role: ["employee", "manager", "super_admin"],
        },
      ],
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
    <>
      {/* desktop sidebar */}
      <Box
        className={`w-[17vw] sticky top-0 flex flex-col shadow-none h-screen  ${
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
    </>
  );
};

export default Sidebar;
