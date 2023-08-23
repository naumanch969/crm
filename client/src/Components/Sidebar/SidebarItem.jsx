import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import { useState, useTransition } from "react";
import { PiCaretDownLight, PiCaretUpLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const SidebarItem = ({ item, child, openedMenu, setOpenedMenu, setShowSidebar }) => {
  const isMenuOpen = openedMenu === item.title.toLowerCase();

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Prevent event propagation to parent elements
    if (child) {
      return; // Don't close when clicking on sub-link
    }
    if (isMenuOpen) {
      setOpenedMenu("");
    } else {
      setOpenedMenu(item.title.toLowerCase());
    }
  };

  const onitemHover = {
    color:'blue'
  }

  return (
    <div
      className={`${child ? "pl-4 hover:text-[#20aee3] font-thin" : "pl-4"} ${isMenuOpen
          ? "text-[#20aee3] font-normal border-l-[3px] border-l-[#20aee3]"
          : " text-gray-700 font-thin"
        } hover:text-[#20aee3] hover:border-l-[3px] hover:border-l-[#20aee3] pr-2 transition-all`}>
      <Link
        to={item.link}
        className="flex items-center justify-between cursor-pointer py-[12px]"
        onClick={handleMenuClick}>
        <span className="flex items-center gap-2">
          {item.icon && (
            <div>
              {item.icon}
            </div>
          )}
          {item.title}
        </span>
        {item.childrens?.length > 0 && (isMenuOpen ? <PiCaretUpLight className="text-[20px]" /> : <PiCaretDownLight className="text-[20px]" />)}
      </Link>

      {item.childrens?.length > 0 && isMenuOpen && (
        <div className="py-2 transition-all">
          {item.childrens.map((child, index) => (
            <SidebarItem
            className="transition-all"
              key={index}
              item={child}
              child={true}
              openedMenu={openedMenu}
              setOpenedMenu={setOpenedMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
