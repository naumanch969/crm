import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import { useState, useTransition } from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ item, child, openedMenu, setOpenedMenu }) => {
  const isMenuOpen = openedMenu === item.title.toLowerCase();

  const [isPending, startTransition] = useTransition();

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

  return (
    <div
      className={`${child ? "pl-6 hover:text-sky-300 font-thin" : "pl-4"} ${
        isMenuOpen
          ? "text-sky-500 font-normal border-l-[4px] border-l-sky-500"
          : " text-gray-700 font-thin"
      } hover:text-sky-500 hover:border-l-[4px] hover:border-l-sky-500  pr-2 transition-colors`}>
      <Link
        to={item.link}
        className="flex items-center justify-between cursor-pointer py-[14px]"
        onClick={handleMenuClick}>
        <span className="flex items-center gap-2">
          {item.icon && (
            <div sx={{ fontWeight: 100 }} size="small">
              {item.icon}
            </div>
          )}
          {item.title}
        </span>
        {item.childrens?.length > 0 && (isMenuOpen ? <ExpandLess /> : <ExpandMore />)}
      </Link>

      {item.childrens?.length > 0 && isMenuOpen && (
        <div className="py-2">

          {item.childrens.map((child, index) => (
            <SidebarItem
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
